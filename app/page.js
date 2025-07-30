import AuthForm from "@/components/auth-form";

export default function Home({ searchParams = {} }) {
  const { mode = "login" } = searchParams;
  return <AuthForm mode={mode} />;
}
