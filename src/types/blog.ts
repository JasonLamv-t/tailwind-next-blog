export interface BlogMeta {
  title: string;
  date: string;
  dateString?: string;
  tags: string[];
  draft: boolean;
  pinned: boolean;
  summary: string;
  image: string;
  canonicalUrl: string;
}
