"use client";

import styles from "@/styles/Home.module.css";
import YouTube from "react-youtube";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LiveClock from "@/components/LiveClock";
import { isYouTubeUrl } from "@/lib/mediaHelpers";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [visitCount, setVisitCount] = useState(null);
  const [access, setAccess] = useState(null);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // ▶ MediaStart logic

  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const handleAdminClick = () => {
    if (session?.user.email !== adminEmail) {
      setShowDialog(true);
    } else {
      router.push("/messagelist");
    }
  };

  useEffect(() => {
    async function getUserStatus() {
      const res = await fetch("/api/visit-count");
      if (res.ok) {
        const data = await res.json();
        setVisitCount(data.visitCount);
        setAccess(data.access);
      }
    }
    if (session) getUserStatus();
  }, [session]);

  useEffect(() => {
    async function checkAccess() {
      const res = await fetch("/api/authorize-content");
      if (res.status === 403) {
        router.push("/upgrade");
      }
    }
    checkAccess();
  }, [router]);

  // ▶ Fetch videos from DB + include default
  useEffect(() => {
    const defaultVideo = {
      url: "eUDVUZZyA0M",
      title:
        "Add videos to start customising your media library. Ludovico Einaudi - Experience is just a sample video.",
    };

    const fetchVideos = async () => {
      if (!session?.user?.id) {
        setVideos([defaultVideo]);
        return;
      }

      try {
        const res = await fetch(`/api/urlhtml?userId=${session.user.id}`);
        const data = await res.json();

        if (res.ok && data.urls.length > 0) {
          const youtubeOnly = data.urls.filter((v) => isYouTubeUrl(v.url));
          const formatted = youtubeOnly.map((v) => ({
            url: v.url,
            title: v.title,
          }));
          setVideos([defaultVideo, ...formatted]);
        } else {
          setVideos([defaultVideo]);
        }
      } catch (err) {
        console.error("Failed to fetch videos:", err);
        setVideos([defaultVideo]);
      }
    };

    fetchVideos();
  }, [session]);

  // ▶ Auto-rotate if not playing
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying && videos.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isPlaying, videos.length]);

  const onPlayerStateChange = (event) => {
    const state = event.data;
    if (state === 1) setIsPlaying(true); // playing
    else if (state === 2 || state === 0) setIsPlaying(false); // paused or ended
  };

  return (
    <div className="background-container bg-background">
      {/* Video Background */}
      {/* Uncomment if needed
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/clouds.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>*/}

      <div className="flex flex-col items-left">
        <div className={styles.homeContainer}>
          <h1 className={styles.gradientText}>
            Welcome{" "}
            <span className="font-bold">
              {session?.user?.name?.split(" ")[0]}
            </span>{" "}
            To Your Media Library
          </h1>

          <div className="flex  flex-col justify-center mr-5">
            {/*<p className="font-thin ml-1 text-sm">{session?.user?.email}</p>*/}
            <div className="flex justify-center gap-2 mb-1 mt-2">
              <LiveClock />
              {/*{dateTime ? (
                <>
                  <p className="mr-5 text-sm font-thin text-black">
                    {dateTime.toLocaleDateString()}
                  </p>
                  <p className="text-sm font-thin text-black">
                    {dateTime.toLocaleTimeString()} hr
                  </p>
                </>
              ) : (
                <p className="text-sm text-black">Loading time...</p>
              )}*/}
            </div>
            {access === "paid" ? (
              <p className="text-sm text-purple-600  font-semibold">
                Full Access User
              </p>
            ) : visitCount !== null ? (
              <p
                className={`text-sm mt-2 ${
                  visitCount >= 3
                    ? "text-red-600"
                    : visitCount === 2
                    ? "text-orange-600"
                    : "text-gray-600"
                }`}
              >
                {visitCount >= 3
                  ? "You’ve used all 3 free visits."
                  : `You’ve used ${visitCount} of 3 free visits.`}
              </p>
            ) : null}
          </div>
          <p className={styles.description}>
            Keep your most important media in a personal library for easy
            reference.
          </p>
          {/*<div className="flex justify-center mt-2">
            <div>
              Owner: <span className="font-bold">{session?.user?.name}</span>
              Owner:{" "}
              <span className="font-bold">
                {session?.user?.name?.split(" ")[0]}
              </span>
            </div>
            <div className="ml-4">
              Email: <span className="font-bold">{session?.user?.email}</span>
            </div>
          </div>*/}

          {/* Explanatory Dropdown */}
          <div className="mt-2">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-fit text-sm bg-purple-600 text-white px-2 py-1 rounded text-center"
            >
              {isDropdownOpen ? "Hide Guide ▴" : "User Guide ▾"}
            </button>
            {isDropdownOpen && (
              <div className="mt-2 text-left text-sm bg-gray-50 border rounded-lg p-4">
                {/*<p className="text-gray-800 font-extrabold">
                  Guide for Media Library App
                </p>*/}
                <ul className="list-disc list-inside text-gray-700">
                  <div className="flex gap-4 text-right">
                    <Link
                      className="bg-purple-600 text-white px-4 py-2 text-xs rounded-lg pt-2 text-right "
                      href="\contact"
                    >
                      Contact Developer
                    </Link>
                    {/* Admin Link */}
                    {/* Admin Button */}
                    <button
                      className="bg-purple-600 text-white px-4 py-2 text-xs rounded-lg pt-2 text-right"
                      onClick={handleAdminClick}
                    >
                      Admin 🚫
                    </button>

                    {/* Simple Custom Dialog */}
                    {showDialog && (
                      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-4 rounded shadow-lg text-center ml-2 mr-2">
                          <p className="text-gray-700">
                            Access Denied. You do not have permission to view
                            this page.
                          </p>
                          <button
                            onClick={() => setShowDialog(false)} // Close dialog
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="mt-2">
                    <strong>Introduction</strong>
                  </p>
                  <p className="text-sm mb-3">
                    Welcome to the Media Library App. This application allows
                    users to search for YouTube videos or URLs and store them in
                    a personalised, searchable library. A key feature of this
                    app is that stored YouTube videos are{" "}
                    <span className="font-bold">ad-free</span>, enhancing your
                    viewing experience.
                  </p>
                  <p>
                    <strong>Features</strong>
                  </p>
                  <li>
                    Search YouTube Videos or URLs: Enter search criteria to find
                    relevant videos or web pages.
                  </li>
                  <li>
                    Preview YouTube Video: Make confident choices by watching
                    the video first — no need to clutter your library with
                    content you haven’t verified. Previewing ensures only
                    relevant, high-quality videos get added to your personal
                    collection.
                  </li>
                  <li>
                    Add to Library: Save selected YouTube videos or URLs to your
                    personal media library.
                  </li>
                  <li>
                    Ad-Free Playback: Enjoy stored YouTube videos without
                    advertisements.
                  </li>
                  <li>
                    Manage Library: Easily delete videos or URLs when they are
                    no longer needed.
                  </li>
                  <p className="mt-3">
                    <strong>Getting Started</strong>
                  </p>
                  <li>
                    Search for Content: Use the search bar to find YouTube
                    videos or URLs.
                  </li>
                  <li>
                    Select a Video or URL: Choose the content you want to add
                    from the search results.
                  </li>
                  <li>
                    Add to Library: Click the &apos;Add to Library&apos; button
                    to store the selected content.
                  </li>
                  <li>
                    Access Stored Media: Navigate to your library to view saved
                    content anytime.
                  </li>
                  <li>
                    Remove Unwanted Items: Click the delete icon to remove a
                    video or URL from your library.
                  </li>
                  <p className="mt-3">
                    <strong>Known Limitations</strong>
                  </p>
                  <li>
                    Add to Library or Delete: It is unusual but possible that an
                    add or delete function may fail on first attempt. It is
                    however probable that it will execute properly on a second
                    attempt.
                  </li>
                  <li>
                    YouTube Sign-In Requirement: Occasionally, certain videos
                    may require a YouTube sign-in to play directly within the
                    app.
                  </li>
                  <li>
                    Region-Based Restrictions: Some YouTube videos, especially
                    those based in the USA, may impose advertisements despite
                    being stored in the library. They may also prevent access
                    from other countries and/or regions. Tip: If you have a VPN
                    installed on your device switch server to the source country
                    eg, use a USA server.
                  </li>
                  <p className="mt-3">
                    <strong>
                      The Media Library App provides a streamlined way to
                      collect and watch YouTube videos without interruptions.
                      While minor limitations exist, the overall experience
                      remains ad-free and efficient. Enjoy managing your
                      personal media collection hassle-free!
                    </strong>
                  </p>
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center">
            <ul className="text-left mt-4 text-slate-800">
              <li className="text-base font-thin">
                <Link
                  href="/youtube"
                  className="flex items-center gap-2 hover:text-blue-500 text-sm sm:text-xl md:text-2xl lg:text-3xl"
                >
                  ❤️ Add your favourite YouTube videos.
                </Link>

                {/* === START Video Carousel === */}
                <div className="border-t-2 rounded-lg bg-purple-200 mt-3 p-4">
                  <div className="flex flex-col items-center">
                    <YouTube
                      videoId={videos[currentIndex]?.url}
                      onStateChange={onPlayerStateChange}
                      onReady={(e) => (playerRef.current = e.target)}
                      opts={{
                        width: "300",
                        height: "170",
                        playerVars: {
                          autoplay: 0,
                          modestbranding: 1,
                          rel: 0,
                        },
                      }}
                    />
                    <p className="mt-2 text-xs font-extralight text-gray-700 text-center">
                      {videos[currentIndex]?.title}
                    </p>
                    <Link
                      href="/youtube"
                      className="bg-purple-600 mt-2 text-xs text-white rounded-md px-3 py-1"
                    >
                      Search & add more videos
                    </Link>
                    <div className="flex mt-4 gap-8">
                      <button
                        onClick={() =>
                          setCurrentIndex(
                            (prev) => (prev - 1 + videos.length) % videos.length
                          )
                        }
                        className="bg-purple-600 text-xs text-white px-3 py-1 rounded hover:bg-purple-700"
                      >
                        ←
                      </button>

                      <span className="text-gray-700 text-sm font-medium">
                        {currentIndex + 1} of {videos.length}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentIndex((prev) => (prev + 1) % videos.length)
                        }
                        className="bg-purple-600 text-xs text-white px-3 py-1 rounded hover:bg-purple-700"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
                {/* === END Video Carousel === */}
              </li>

              <li className="mt-4 text-base font-thin">
                <Link
                  href="/customsearch"
                  className="flex items-center gap-2 hover:text-blue-500 text-sm sm:text-xl md:text-2xl lg:text-3xl"
                >
                  ➕ Add URLs for quick reference.
                </Link>
              </li>
              <li className="mt-3 text-base font-thin">
                <Link
                  href="/enhanced"
                  className="flex items-center gap-2 hover:text-blue-500 text-sm sm:text-xl md:text-2xl lg:text-3xl"
                >
                  🔍 Easily search your library.
                </Link>
              </li>
              <li className="mt-3 text-base font-thin">
                <Link
                  href="/enhanced"
                  className="flex items-center gap-2 hover:text-blue-500 text-sm sm:text-xl md:text-2xl lg:text-3xl"
                >
                  🏠 Centralise your media links.
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
