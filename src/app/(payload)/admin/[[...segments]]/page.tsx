import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import config from "@/payload.config";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{
    segments?: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config, params: params as any, searchParams: searchParams as any });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, importMap, params: params as any, searchParams: searchParams as any });

export default Page;
