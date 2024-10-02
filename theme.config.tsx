import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useConfig, DocsThemeConfig, useTheme } from 'nextra-theme-docs';
import Link from 'next/link';
import SparklesText from "@/components/ui/sparkles-text/SparklesText";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicThemeToggle = dynamic(() => import('components/ui/theme-toggle/ThemeToggle'), {
  ssr: false,
});

const config: DocsThemeConfig = {
  head: function useHead() {
    const config = useConfig<{ description?: string; image?: string }>();
    const description = config.frontMatter.description || 'Cloud PC on Aptos';
    const title = `${config.title} | Walnet - Cloud PC on Aptos`;
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo/logo.png" />
      </>
    );
  },
  navbar: {
    extraContent: <DynamicThemeToggle />,
  },
  notFound: {
    content: () => {
      return (
        <h1>Not found</h1>
      )
    },
    labels: "Not found 404"
  },
  toc: {
    backToTop: true,
    float: true
  },
  logoLink: false,
  logo: function useRouterLogo() {
    const [selectedVersion, setSelectedVersion] = useState('latest');
    const [renderSelect, setRenderSelect] = useState(true);

    const versionsArr = ['v1.0.1', 'v1.0.2', 'v1.0.3', 'v1.0.4']; // Danh sách các phiên bản có sẵn

    useEffect(() => {
      const pathArray = window.location.pathname.split('/');
      setRenderSelect(pathArray.includes('docs') && pathArray[1] === 'docs');
      const currentVersion = pathArray[pathArray.length - 1];

      if (currentVersion === 'latest') {
        const latestVersion = versionsArr.sort((a, b) => (a > b ? -1 : 1))[0];
        setSelectedVersion(latestVersion);
      } else if (versionsArr.includes(currentVersion)) {
        setSelectedVersion(currentVersion);
      }
    }, [versionsArr]);

    const handleChange = (e) => {
      let version = e.target.value;
      const latestVersion = versionsArr.sort((a, b) => (a > b ? -1 : 1))[0];
      if (version === latestVersion) {
        version = 'latest';
      }
      setSelectedVersion(version);
      if (version) {
        window.location.href = `/docs/${version}`;
      }
    };

    return (
      <div className='flex flex-row'>
        <Link
          href="/"
          className="hidden sm:flex items-center text-current no-underline hover:opacity-75 ltr:mr-auto rtl:ml-auto"
        >

          <div className="flex items-center relative">
            <SparklesText
              text="WA"
              sparklesCount={4}
              className='text-xl font-extrabold text-blue-400'
              colors={{ first: '#A855F7', second: '#A855F7' }}
            />
            <Image src="/logo/logo.png" alt="logo" width={20} height={20} />
            <span className="text-xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              NET
            </span>
            {/* <span className="absolute inset-0 blur-3xl bg-gradient-to-r opacity-30 from-blue-400 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-50 transition-opacity duration-300"></span> */}
          </div>
        </Link>

        {
          renderSelect &&
          <select
            value={selectedVersion}
            onChange={handleChange}
            className="bg-gray-100 sm:ms-[80px] py-2 px-4 pe-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          >
            {versionsArr.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        }
      </div>
    );
  },
  darkMode: true,
  sidebar: {
    toggleButton: true,
    defaultMenuCollapseLevel: 1
  },
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',

  footer: {
    component: (
      <footer className="bg-neutral-300 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
        <hr className="dark:border-neutral-800" />
        <div className="mx-auto max-w-[1440px] p-6 lg:py-10">
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm  sm:text-center dark:text-gray-400">
              © {new Date().getFullYear()} Atopus.{' '}
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <Link href="#" className=" hover:text-gray-900 dark:hover:text-white">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook page</span>
              </Link>
              <Link href="#" className=" hover:text-gray-900 dark:hover:text-white ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                </svg>
                <span className="sr-only">Discord community</span>
              </Link>
              <Link href="#" className=" hover:text-gray-900 dark:hover:text-white ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Twitter page</span>
              </Link>
              <Link href="#" className=" hover:text-gray-900 dark:hover:text-white ms-5">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    ),
  },
}

export default config
