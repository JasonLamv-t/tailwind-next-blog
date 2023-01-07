module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    'postcss-preset-env',
    process.env.NODE_ENV === 'production'
      ? [
          '@fullhuman/postcss-purgecss',
          {
            content: ['./pages/**/*.{js,jsx,ts,tsx.mdx}'],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || []
          }
        ]
      : undefined
  ]
};
