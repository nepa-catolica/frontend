PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "http://nepa.catolicapb.com.br:8890/",
    secure: true,
    logLevel: "debug",
    pathRewrite: {"^/api": ''}
  }
];

module.exports = PROXY_CONFIG;