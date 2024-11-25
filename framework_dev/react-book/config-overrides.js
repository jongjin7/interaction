const path = require("path");

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  };
  const svgRuleIndex = config.module.rules.findIndex((rule) =>
    rule.test?.toString().includes("svg"),
  );

  // 기존 SVG 로더 비활성화
  if (svgRuleIndex >= 0) {
    config.module.rules[svgRuleIndex].exclude = /\.svg$/;
  }

  // 새로운 SVG 로더 추가
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          svgo: true,
          svgoConfig: {
            plugins: [
              //{ removeViewBox: false }, // viewBox 유지
              //{ removeDimensions: true }, // width와 height 속성 제거
            ],
          },
        },
      },
    ],
  });

  return config;
};
