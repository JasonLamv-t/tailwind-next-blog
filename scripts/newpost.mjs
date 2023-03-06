import inquirer from 'inquirer';
import { slug } from 'github-slugger';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const blogsRootPath = path.resolve('data', 'blogs');
const checkBlogsRootPath = (source = '') => {
  const dir = path.resolve(blogsRootPath, source);
  if (!fs.existsSync(dir)) fs.mkdirSync(path.resolve(dir), { recursive: true });
};
const getSubdir = () => {
  const subDirs = fs
    .readdirSync(blogsRootPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  subDirs.unshift('.');
  subDirs.push('new');
  return subDirs;
};

checkBlogsRootPath();

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input',
      validate: (title) => {
        if (title === '') return 'Title cannot be empty';
        return true;
      },
    },
    {
      name: 'directorie',
      message: 'choose a directory:',
      type: 'list',
      choices: getSubdir(),
    },
    {
      name: 'dirname',
      message: 'Enter the new directory name:',
      type: 'input',
      when: (answer) => answer.directorie === 'new',
    },
    {
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },
    {
      name: 'summary',
      message: 'Enter post summary:',
      type: 'input',
    },
    {
      name: 'draft',
      message: 'Set post as draft?',
      type: 'confirm',
      default: false,
    },
    {
      name: 'tags',
      message: 'Any Tags? Separate them with , or leave empty if no tags.',
      type: 'input',
    },
    {
      name: 'canonicalUrl',
      message: 'Enter canonical url:',
      type: 'input',
    },
  ])
  .then((res) => {
    const { title, summary, draft, tags, canonicalUrl } = res;

    const fileName = slug(title);
    const date = new Date()
      .toLocaleDateString('en-GB')
      .split('/')
      .reverse()
      .join('-');
    res.tags = res.tags === '' ? [] : res.tags.split(',').map((t) => t.trim());
    const meta = matter.stringify('', {
      title,
      date,
      summary,
      draft,
      tags,
      canonicalUrl,
    });

    if (res.directorie === 'new') checkBlogsRootPath(res.dirname);

    const filePath = path.resolve(
      blogsRootPath,
      res.dirname ?? res.directorie,
      `${fileName}.${res.extension}`
    );

    fs.writeFile(filePath, meta, { flag: 'wx' }, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Blog post generated successfully at ${filePath}`);
      }
    });
  })
  .catch((err) => {
    if (err.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log('Something went wrong, sorry!');
    }
  });
