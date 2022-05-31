import fs from "fs";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layout";

export default function pages({ frontmatter, markdown }) {
  return (
    <Layout>
      <div>
        <Head>
          <title>{frontmatter.title}</title>
        </Head>
        <h1>{frontmatter.title}</h1>
        <span>{frontmatter.date}</span>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const fileContent = matter(
    fs.readFileSync(`./content/pages/${slug}.md`, "utf8")
  );
  let frontmatter = fileContent.data;
  const markdown = fileContent.content;

  return {
    props: { frontmatter, markdown },
  };
}

export async function getStaticPaths() {
  const filesInProjects = fs.readdirSync("./content/pages");
  const paths = filesInProjects.map((file) => {
    const filename = file.slice(0, file.indexOf("."));
    return { params: { slug: filename } };
  });

  return {
    paths,
    fallback: false, // This shows a 404 page if the page is not found
  };
}
