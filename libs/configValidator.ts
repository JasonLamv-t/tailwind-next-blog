import Config from '@/types/Config';

const checkConfigAndEnvironments = (config: Omit<Config, 'env'>): Config => {
  // const algolia = {
  //   app_id: process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID,
  //   api_key: process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY,
  //   index_name: process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME,
  // };
  // const env = {
  //   algolia,
  //   isAlgoliaAvailable: Object.values(algolia).every((v) => !!v),
  // };
  return { ...config }; // TODO: add env back };
};

export default checkConfigAndEnvironments;
