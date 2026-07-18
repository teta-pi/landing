/*!
 * TETA+PI Universal Tag — tag.js (Part A)
 * <script async src="https://tetapi.dev/tag.js" data-entity="YOUR_ENTITY_ID"></script>
 *
 * Injects schema.org JSON-LD from the entity's public TETA+PI profile and
 * sends one indexing beacon per page load. No cookies, no cross-site
 * tracking, no persistent identifiers. Fails silently, never blocks render.
 */
(function () {
  "use strict";

  try {
    var currentScript = document.currentScript || (function () {
      var scripts = document.getElementsByTagName("script");
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].src && scripts[i].src.indexOf("tag.js") !== -1) return scripts[i];
      }
      return null;
    })();

    if (!currentScript) return;

    var entityId = currentScript.getAttribute("data-entity");
    if (!entityId) return;

    var API_BASE = "https://api.tetapi.dev";

    // 1. Fetch the public profile, inject schema.org JSON-LD.
    fetch(API_BASE + "/api/v1/businesses/" + encodeURIComponent(entityId) + "/preview", {
      method: "GET",
      credentials: "omit",
      mode: "cors"
    })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (!data) return;

        var name = data.name || data.business_name || document.title;
        var slug = data.slug || data.entity_slug;
        var type = (data.entity_type === "person" || data.entity_type === "individual") ? "Person" : "Organization";

        var jsonLd = {
          "@context": "https://schema.org",
          "@type": type,
          "name": name,
          "url": window.location.origin
        };
        if (slug) jsonLd.sameAs = ["https://app.tetapi.dev/e/" + slug];

        var ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.text = JSON.stringify(jsonLd);
        document.head.appendChild(ld);
      })
      .catch(function () {});

    // 2. One indexing beacon per page load. Endpoint ships in phase 12.5b —
    // sendBeacon/fetch here are fine to fire against it early; failures are silent.
    try {
      var payload = JSON.stringify({
        entity_id: entityId,
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer || ""
      });
      var beaconUrl = API_BASE + "/v1/tag-ping";

      if (navigator.sendBeacon) {
        navigator.sendBeacon(beaconUrl, new Blob([payload], { type: "application/json" }));
      } else {
        fetch(beaconUrl, {
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          credentials: "omit"
        }).catch(function () {});
      }
    } catch (e) {}
  } catch (e) {}
})();
