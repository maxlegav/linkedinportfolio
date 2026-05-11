import { ComposerStub } from "@/components/feed/ComposerStub";
import { FeedAside } from "@/components/feed/FeedAside";
import { ProfileMiniCard } from "@/components/feed/ProfileMiniCard";
import { ProjectPost } from "@/components/feed/ProjectPost";
import { FeedScrollNav } from "@/components/feed/FeedScrollNav";
import { education, feedAsideItems, me, projectPosts } from "@/data/portfolio";

export default function FeedPage() {
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-center lg:gap-6">
        <aside className="order-2 w-full shrink-0 lg:order-none lg:w-[250px]">
          <ProfileMiniCard user={me} education={education} />
        </aside>

        <section className="order-1 min-w-0 flex-1 lg:order-none lg:max-w-[555px]" aria-label="Project feed">
          <ComposerStub user={me} />
          {projectPosts.map((post, i) => (
            <ProjectPost key={post.id} post={post} index={i} total={projectPosts.length} />
          ))}
          {/* Bottom anchor */}
          <div id="feed-bottom" className="h-1" />
        </section>

        <aside className="order-3 hidden w-full shrink-0 xl:block xl:w-[300px]" aria-label="Quick panel">
          <FeedAside title="Quick links" items={feedAsideItems} />
        </aside>
      </div>

      {/* Floating chat button + scroll nav */}
      <FeedScrollNav postIds={projectPosts.map((p) => p.id)} authorEmail={me.email} />
    </>
  );
}
