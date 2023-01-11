module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {},
    '@fullhuman/postcss-purgecss': {
      content:
        process.env.NODE_ENV === 'production'
          ? ['./pages/**/*.{ts,tsx.mdx}', './components/**/*.{ts,tsx.mdx}']
          : [],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
    }
  }
};
