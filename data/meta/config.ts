interface Config {
  algoliaEnabled: boolean;
}

const config: Config = {
  algoliaEnabled: true,
};

const checkConfigAndEnvironments = (config: Config) => {
  const algoliaUseabled =
    !!process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID &&
    !!process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY &&
    !!process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME;
  return { ...config, algoliaUseabled };
};

export default checkConfigAndEnvironments(config);
