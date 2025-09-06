
"use client";
import { Suspense } from "react";
import { useParams, usePathname, useSearchParams, useRouter } from "next/navigation";
import { RiArrowLeftSLine } from "react-icons/ri";

function HeaderContent() {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const router = useRouter();

   const isParkingPage =
    pathname === `/pay-parking/${params?.slug}` && Boolean(phone);

  // Condition: if path is "/[slug]" (top-level slug)
  const isSlugPage = pathname === `/${params?.slug}`;

  return (
    <>
      {isSlugPage || isParkingPage ? (
        <div className="parking-header">
          <div className="logo-circle">
            <img
              src="/tsp_logo.png"
              alt="logo"
              height={100}
              width={100}
              className="p-3"
            />
          </div>
        </div>
      ) : (
        <nav
          className="navbar ps-3 navbar-dark payment_background_light justify-content-start align-items-center"
          style={{ background: "rgb(0, 0, 0)" }}
        >
          <div
            className="d-flex header_buttons"
            onClick={() => router.back()}
          >
            <button
              id="back1"
              type="button"
              className="btn btn-primary p-1"
            >
              <RiArrowLeftSLine size={30} />
            </button>
          </div>
          <a
            className="navbar-brand pt-0"
            href="/pay-parking"
            style={{ paddingLeft: "1rem" }}
          >
            Pay Now
          </a>
        </nav>
      )}
    </>
  );
}

export default function MainHeader() {
  return (
    <Suspense fallback={null}>
      <HeaderContent />
    </Suspense>
  );
}
