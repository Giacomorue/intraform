"use client";

import { PageType, SectionType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { containerAnimation } from "@/lib/animation";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

function GalleryView({
  section,
  dev,
  allPages,
  allSections,
}: {
  section: SectionType;
  dev?: boolean;
  allPages: PageType[];
  allSections: SectionType[];
}) {
  const router = useRouter();

  const [updateCounter, setUpdateCounter] = useState(0);
  const [carouselCounter, setCarouselCounter] = useState(0);

  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  useEffect(() => {
    if (dev) {
      setLink1("");
      setLink2("");
    } else {
      const sec = section;
      if (section.data.primaryLink?.at(0) === "/") {
        //LINK A PAGINA
        const pageId = sec.data.primaryLink?.split("/")[1];
        const page = allPages.find((p) => p.PageId === pageId);
        setLink1("/" + page?.link);
      } else if (section.data.primaryLink?.at(0) === "#") {
        //LINK AD ANCORA
        const sectionId = sec.data.primaryLink?.split("#")[1];
        const section = allSections.find((s) => s.SectionId === sectionId);
        setLink1("#" + section?.name);
      }

      if (section.data.secondaryLink?.at(0) === "/") {
        //LINK A PAGINA
        const pageId = sec.data.secondaryLink?.split("/")[1];
        const page = allPages.find((p) => p.PageId === pageId);
        setLink2("/" + page?.link);
      } else if (section.data.secondaryLink?.at(0) === "#") {
        //LINK AD ANCORA
        const sectionId = sec.data.secondaryLink?.split("#")[1];
        const section = allSections.find((s) => s.SectionId === sectionId);
        setLink2("#" + section?.name);
      }
    }
  }, [section, dev, allPages, allSections]);

  useEffect(() => {
    setUpdateCounter((prev) => prev + 1);
  }, [section]);

  useEffect(() => {
    const carouselUpdate = () => {
      setCarouselCounter((prev) => prev + 1);
    };

    window.addEventListener("resize", carouselUpdate);

    return () => {
      window.removeEventListener("resize", carouselUpdate);
    };
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id={section.name}
      style={{
        backgroundColor: section.data.backgroundImages
          ? "transparent"
          : section.data.backgroundColor,
      }}
      className={`${
        section.data.hScreen
          ? "lg:h-[calc(100vh-80px)] h-auto py-20 lg:py-0"
          : ""
      } w-screen relative lg:overflow-hidden !max-w-[100%] !overflow-x-hidden`}
      key={dev ? updateCounter : mounted ? section.SectionId : undefined}
    >
      {section.data.backgroundImages && section.data.backgroundImageOpacity && (
        <div className={` h-full w-full absolute inset-0`}>
          <div className="h-full w-full relative">
            <Image
              src={section.data.backgroundImages}
              alt=""
              fill
              className="object-cover"
              style={{
                opacity: section.data.backgroundImageOpacity / 100,
              }}
            />
          </div>
        </div>
      )}
      <div
        style={{
          paddingBottom: section.data.hScreen
            ? "0px"
            : section.data.space + "px",
          paddingTop: section.data.hScreen ? "0px" : section.data.space + "px",
        }}
        className={`h-full z-30 flex containerDesign  flex-col items-center justify-center ${
          section.data.hScreen ? "py-10 lg:py-0" : "!max-lg:!py-10"
        }`}
      >
        <div
          className={`mx-auto flex flex-col w-[100%] items-center justify-center gap-12`}
        >
          {(section.data.textBlack ||
            section.data.textBlue ||
            section.data.textGreen) && (
            <>
              {section.data.animation ? (
                <motion.div
                  viewport={{ once: true }}
                  variants={containerAnimation(0, section.data.animationType)}
                  initial={section.data.animation ? "hidden" : {}}
                  whileInView={section.data.animation && mounted ? "show" : {}}
                  className="h4Mobile md:h4Desktop xl:h3Desktop relative text-center"
                >
                  {/* Title */}

                  {section.data.textBlue && section.data.textGreen ? (
                    <>
                      <span className="text-accentDesign">
                        {section.data.textBlue}
                      </span>{" "}
                      <span className="text-primaryDesign">
                        {section.data.textGreen}
                      </span>
                    </>
                  ) : section.data.textBlue ? (
                    <>
                      <span className="text-accentDesign">
                        {section.data.textBlue}
                      </span>
                    </>
                  ) : section.data.textGreen ? (
                    <>
                      <span className="text-primaryDesign">
                        {section.data.textGreen}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-textDesign">
                        {section.data.textBlack}
                      </span>
                    </>
                  )}
                </motion.div>
              ) : (
                <div className="h4Mobile md:h4Desktop xl:h3Desktop relative text-center">
                  {/* Title */}

                  {section.data.textBlue && section.data.textGreen ? (
                    <>
                      <span className="text-accentDesign">
                        {section.data.textBlue}
                      </span>{" "}
                      <span className="text-primaryDesign">
                        {section.data.textGreen}
                      </span>
                    </>
                  ) : section.data.textBlue ? (
                    <>
                      <span className="text-accentDesign">
                        {section.data.textBlue}
                      </span>
                    </>
                  ) : section.data.textGreen ? (
                    <>
                      <span className="text-primaryDesign">
                        {section.data.textGreen}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-textDesign">
                        {section.data.textBlack}
                      </span>
                    </>
                  )}
                </div>
              )}
            </>
          )}
          {section.data.images && (
            <>
              {section.data.animation ? (
                <motion.div
                  variants={containerAnimation(0, section.data.animationType)}
                  viewport={{ once: true }}
                  initial={section.data.animation ? "hidden" : {}}
                  whileInView={section.data.animation && mounted ? "show" : {}}
                  className="w-full h-[350px] md:h-[500px]"
                >
                  {section.data.images && section.data.images.length > 1 ? (
                    <Swiper
                      spaceBetween={20}
                      slidesPerView={1}
                      autoplay={{
                        delay: 5000,
                      }}
                      speed={1200}
                      loop={true}
                      className="h-[100%] w-full"
                      modules={[Autoplay, Pagination, Navigation]}
                      pagination={section.data.carouselDots}
                      navigation={section.data.carouselButtons}
                      key={dev ? section.name + carouselCounter : section.name}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                        //   1300: {
                        //     slidesPerView: 4,
                        //   },
                      }}
                    >
                      {section.data.images.map((image) => (
                        <SwiperSlide key={image} className="relative">
                          <Image
                            src={image || ""}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="h-[100%] w-full">
                      <Image
                        src={section.data.images[0]}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="w-full h-[350px] md:h-[500px]">
                  {section.data.images && section.data.images.length > 1 ? (
                    <Swiper
                      spaceBetween={20}
                      slidesPerView={1}
                      autoplay={{
                        delay: 5000,
                      }}
                      speed={1200}
                      loop={true}
                      className="h-[100%] w-full"
                      modules={[Autoplay, Pagination, Navigation]}
                      pagination={section.data.carouselDots}
                      navigation={section.data.carouselButtons}
                      key={dev ? section.name + carouselCounter : section.name}
                      breakpoints={{
                        640: {
                          slidesPerView: 1,
                        },
                        768: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                        //   1300: {
                        //     slidesPerView: 4,
                        //   },
                      }}
                    >
                      {section.data.images.map((image) => (
                        <SwiperSlide key={image} className="relative">
                          <Image
                            src={image || ""}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="h-[100%] w-full">
                      <Image
                        src={section.data.images[0]}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {(section.data.primaryButton || section.data.secondaryButton) && (
            <>
              {section.data.animation ? (
                <motion.div
                  viewport={{ once: true }}
                  variants={containerAnimation(0.2, section.data.animationType)}
                  initial={section.data.animation ? "hidden" : {}}
                  whileInView={section.data.animation && mounted ? "show" : {}}
                  className="flex md:flex-row flex-col gap-3 md:gap-6"
                >
                  {section.data.primaryButton && (
                    <a href={dev ? undefined : link1 ? link1 : undefined}>
                      <Button
                        width={section.data.widthPrimaryButton || 0}
                        height={section.data.heightPrimaryButton || 0}
                        onClick={() => {}}
                        className="scale-90 md:scale-100 xl:scale-105"
                        animation
                      >
                        <p>{section.data.primaryButtonText}</p>
                      </Button>
                    </a>
                  )}
                  {section.data.secondaryButton && (
                    <a href={dev ? undefined : link2 ? link2 : undefined}>
                      <Button
                        width={section.data.widthSecondaryButton || 0}
                        height={section.data.heightSecondaryButton || 0}
                        onClick={() => {}}
                        className="scale-90 md:scale-100 xl:scale-105"
                        secondary
                        animation
                      >
                        <p>{section.data.secondaryButtonText}</p>
                      </Button>
                    </a>
                  )}
                </motion.div>
              ) : (
                <div className="flex md:flex-row flex-col gap-3 md:gap-6">
                  {section.data.primaryButton && (
                    <a href={dev ? undefined : link1 ? link1 : undefined}>
                      <Button
                        width={section.data.widthPrimaryButton || 0}
                        height={section.data.heightPrimaryButton || 0}
                        onClick={() => {}}
                        className="scale-90 md:scale-100 xl:scale-105"
                        animation
                      >
                        <p>{section.data.primaryButtonText}</p>
                      </Button>
                    </a>
                  )}
                  {section.data.secondaryButton && (
                    <a href={dev ? undefined : link2 ? link2 : undefined}>
                      <Button
                        width={section.data.widthSecondaryButton || 0}
                        height={section.data.heightSecondaryButton || 0}
                        onClick={() => {}}
                        className="scale-90 md:scale-100 xl:scale-105"
                        secondary
                        animation
                      >
                        <p>{section.data.secondaryButtonText}</p>
                      </Button>
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default GalleryView;
