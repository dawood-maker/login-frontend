const reportVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      const logMetric = (metric) => {
        console.log(
          `%c[WebVitals] ${metric.name}: ${metric.value}`,
          "color: #6366f1; font-weight: bold;",
        );
        onPerfEntry(metric); // optional callback
      };

      getCLS(logMetric);
      getFID(logMetric);
      getFCP(logMetric);
      getLCP(logMetric);
      getTTFB(logMetric);
    });
  }
};

export default reportVitals;
