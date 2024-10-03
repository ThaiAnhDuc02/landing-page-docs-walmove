import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useConfig, DocsThemeConfig } from 'nextra-theme-docs';
import Link from 'next/link';
import SparklesText from "@/components/ui/sparkles-text/SparklesText";
import dynamic from 'next/dynamic';
import { APP_CONFIG } from './config/app-config';
import { useRouter } from 'next/router';

const DynamicThemeToggle = dynamic(() => import('components/ui/theme-toggle/ThemeToggle'), {
  ssr: false,
});

const VersionSelector = () => {
  const [selectedVersion, setSelectedVersion] = useState('');

  useEffect(() => {
    const pathArray = window.location.pathname.split('/');
    const currentVersion = pathArray[pathArray.indexOf('docs') + 1];

    // Kiểm tra xem phiên bản hiện tại có trong danh sách không
    if (APP_CONFIG.versions.includes(currentVersion)) {
      setSelectedVersion(currentVersion);
    } else {
      // Nếu không tìm thấy, sử dụng phiên bản mới nhất
      setSelectedVersion(APP_CONFIG.versions[0]);
    }

    console.log('Current URL:', window.location.pathname);
    console.log('Detected version:', currentVersion);
  }, []);

  const handleChange = (e) => {
    const version = e.target.value;
    setSelectedVersion(version);
    window.location.href = `/docs/${version}`;
  };

  console.log('Selected version:', selectedVersion);

  if (!selectedVersion) return null; // Không render nếu chưa có phiên bản được chọn

  return (
    <select
      value={selectedVersion}
      onChange={handleChange}
      className="bg-gray-100 sm:ms-[80px] py-2 px-4 pe-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
    >
      {APP_CONFIG.versions.map((version) => (
        <option key={version} value={version}>
          {version}
        </option>
      ))}
    </select>
  );
};
const config: DocsThemeConfig = {
  head: function useHead() {
    const config = useConfig<{ description?: string; image?: string }>();
    const description = config.frontMatter.description || APP_CONFIG.description;
    const title = `${config.title} | ${APP_CONFIG.name} - ${APP_CONFIG.description}`;
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <link rel="apple-touch-icon" sizes="180x180" href={APP_CONFIG.logo} />
        <link rel="icon" type="image/png" sizes="32x32" href={APP_CONFIG.logo} />
        <link rel="icon" type="image/png" sizes="16x16" href={APP_CONFIG.logo} />
      </>
    );
  },
  navbar: {
    extraContent: <DynamicThemeToggle />,
  },
  notFound: {
    content: () => <h1>Not found</h1>,
    labels: "Not found 404"
  },
  toc: {
    backToTop: true,
    float: true
  },
  logoLink: false,
  logo: function useRouterLogo() {
    const [renderSelect, setRenderSelect] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const shouldRenderSelect = router.pathname.startsWith('/docs') &&
        !router.pathname.startsWith('/docs/user-guide');
      console.log('Current path:', router.pathname);
      console.log('Should render select:', shouldRenderSelect);
      setRenderSelect(shouldRenderSelect);
    }, [router.pathname]);

    return (
      <div className='flex flex-row items-center'>
        <Link href="/" className="hidden sm:flex items-center text-current no-underline hover:opacity-75 ltr:mr-auto rtl:ml-auto">
          <div className="flex items-center relative">
            <SparklesText
              text="WA"
              sparklesCount={4}
              className='text-xl font-extrabold text-blue-400'
              colors={{ first: '#A855F7', second: '#A855F7' }}
            />
            <Image src={APP_CONFIG.logo} alt="logo" width={20} height={20} />
            <span className="text-xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              NET
            </span>
          </div>
        </Link>
        {renderSelect && <VersionSelector />}
      </div>
    );
  },
  darkMode: true,
  sidebar: {
    toggleButton: true,
    defaultMenuCollapseLevel: 1
  },
  project: {
    link: APP_CONFIG.github,
  },
  chat: {
    link: APP_CONFIG.discord,
  },
  docsRepositoryBase: APP_CONFIG.github,
  footer: {
    component: (
      <footer className="bg-neutral-300 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
        <hr className="dark:border-neutral-800" />
        <div className="mx-auto max-w-[1440px] p-6 lg:py-10">
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm sm:text-center dark:text-gray-400">
              © {new Date().getFullYear()} {APP_CONFIG.name}.{' '}
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              {Object.entries(APP_CONFIG.social).map(([name, url]) => (
                <Link key={name} href={url} className="hover:text-gray-900 dark:hover:text-white ms-5">
                  <span className="sr-only">{name} page</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    ),
  },
};

export default config;