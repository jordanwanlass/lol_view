import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { Layout } from "~/components/Layout";

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();

  return (
    <Layout>
      <Hero />
    </Layout>
  );
};

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-extrabold">LoL View</h1>
          <p className="py-6">
            LoL View is here not only to give you better insights into your
            stats, but your 5 stack performance as well. Gain a better
            understanding of how you and your teammates play so you can start
            earning more LP than you know what to do with.
          </p>
          {/* <button
            className="btn btn-primary"
            onClick={() => void signIn("discord", { callbackUrl: "/portal" })}
          >
            Get Started
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
