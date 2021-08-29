module.exports = (api) => {
  api.cache(true)
  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
    ],
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: false,
        },
      ],
      [
        'emotion',
        {
          sourceMap: false,
        },
      ],
      [
        'import',
        {
          libraryName: 'esc-ui',
          style: true,
        },
        'esc-ui',
      ],
    ],
  }
}
