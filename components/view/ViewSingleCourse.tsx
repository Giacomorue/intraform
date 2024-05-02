import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../Button";

import { motion } from "framer-motion";
import { containerAnimation } from "@/lib/animation";
import Input from "../Input";
import usePrivacyModal from "@/hooks/usePrivacyModal";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import axios from "axios";

const Map = dynamic(() => import('./Map'), {
  ssr: false,
});

function ViewSingleCourse({
  name,
  link,
  title,
  description,
  price,
  duration,
  code,
  image,
  haveFile,
  fileLink,
  dev,
}: {
  name?: string;
  link?: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: string;
  code?: string;
  image?: string;
  haveFile?: boolean;
  fileLink?: string;
  dev?: boolean;
}) {
  const privacyModal = usePrivacyModal();

  const [nameContact, setNameContact] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [telefonoContact, setTelefonoContact] = useState("");
  const [messageContact, setMessageContact] = useState("");
  const [privacy, setPrivacy] = useState(false);

  const [isLoafing, setIsLoafing] = useState(false);


  const onPressContactBtn = () => {
    setIsLoafing(true);
    if (!nameContact || !emailContact || !messageContact || !telefonoContact) {
      toast.error("Compila tutti i campi");
      setIsLoafing(false);
      return;
    }

    if (!privacy) {
      toast.error("Conferma di aver letto le policy per poterci contattare");
      setIsLoafing(false);
      return;
    }

    try {
      const req = axios.post("/api/contact", {
        nome: nameContact, telefono: telefonoContact, email: emailContact, messaggio: messageContact, corso: name
      });

      toast.success("Grazie per averci contattato! Riceverai nostre notizie al più presto");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }

    setEmailContact("");
    setMessageContact("");
    setTelefonoContact("");
    setNameContact("");
    setPrivacy(false);

    setIsLoafing(false);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      key={dev ? name : mounted ? name : undefined}
      className={`${dev ? "w-full" : "w-[100vw] pt-[90px] containerDesign"}`}
    >
      <div className="w-full flex lg:flex-row flex-col-reverse gap-10 items-start">
        <div className="w-full lg:w-[70%] flex-col flex gap-3">
          {duration && <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={mounted ? "show" : ""}
            className="font-semibold text-[30px] !text-primaryDesign tracking-wider"
          >
            {duration}
          </motion.div>}
          {title && <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={mounted ? "show" : ""}
            className="h1Desktop !text-accentDesign"
          >
            {title}
          </motion.div>}
          {(code || price) && <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={mounted ? "show" : ""}
            className="flex flex-col gap-2"
          >
            {code && <div className="">
              <span className="large-medium !text-primaryDesign">Codice: </span>
              <span className="large-extrabold">{code}</span>
            </div>}
            {price && <div className="">
              <span className="large-medium !text-primaryDesign">Prezzo: </span>
              <span className="large-extrabold">€{price}</span>
            </div>}
          </motion.div>}
          {description && <motion.div
            viewport={{ once: true }}
            variants={containerAnimation(0, "up")}
            initial={"hidden"}
            whileInView={mounted ? "show" : ""}
            className="large-normal"
          >
            {description}
          </motion.div>}
        </div>
        {(image || duration || title || description) && <motion.div
          viewport={{ once: true }}
          variants={containerAnimation(0, "up")}
          initial={"hidden"}
          whileInView={mounted ? "show" : ""}
          className="w-full lg:w-[30%] lg:border-textDesign/50 lg:p-4 lg:border-2 lg:sticky lg:top-28 overflow-hidden"
        >
          <div className="w-full h-[350px] lg:h-[200px] relative">
            <Image src={image || ""} alt="Image" fill objectFit="cover" />
          </div>
          <div className="hidden lg:flex flex-col gap-2 mt-[20px]">
            <div className="font-semibold text-[20px] !text-primaryDesign tracking-wide line-clamp-1">
              {duration}
            </div>
            <div className="h5Desktop !text-accentDesign !leading-[100%] cursor-pointer hover:underline underline-offset-1">
              {title}
            </div>
            <div className="small-normal line-clamp-4">{description}</div>
          </div>

          {haveFile && (
            <div className="hidden lg:flex flex-col gap-2 w-full mt-[30px]">
              <Button
                onClick={() => {}}
                height={55}
                className="w-full regular-medium !text-white"
                secondary
              >
                Scarica il programma
              </Button>
            </div>
          )}
        </motion.div>}
      </div>
      <div
        className={`mx-auto flex flex-col w-[100%] items-center justify-center gap-6`}
      >
        <div
          className="h4Mobile md:h4Desktop xl:h3Desktop relative text-center text-primaryDesign"
        >
          {/* Title */}
          Contattaci per scoprire di più
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-10 mt-8">
          {/* FORM */}
          <div className="w-[100%] lg:w-[50%] flex flex-col items-center justify-center z-[20]">
            <div
              className="max-w-[500px] w-[100%] space-y-[20px] "
            >
              <div className="w-full">
                <Input
                  value={nameContact}
                  onValueChange={(e) => setNameContact(e.target.value)}
                  label="Nome e Cognome"
                  notAnimate
                  disabled={isLoafing}
                />
              </div>
              <div className="w-full">
                <Input
                  value={emailContact}
                  onValueChange={(e) => setEmailContact(e.target.value)}
                  label="Email"
                  notAnimate
                  disabled={isLoafing}
                />
              </div>
              <div className="w-full">
                <Input
                  value={telefonoContact}
                  onValueChange={(e) => setTelefonoContact(e.target.value)}
                  label="Numero di telefono"
                  notAnimate
                  disabled={isLoafing}
                />
              </div>
              <div className="w-full">
                <Input
                  value={messageContact}
                  onValueChange={(e) => setMessageContact(e.target.value)}
                  label="Messaggio"
                  textArea
                  rows={5}
                  notAnimate
                  disabled={isLoafing}
                />
              </div>
              <div className="flex flex-row items-center justify-center gap-2">
                <input
                  type="checkbox"
                  checked={privacy}
                  onChange={(e) => setPrivacy(e.target.checked)}
                  disabled={isLoafing}
                />
                <p
                  className={`regular-normal`}
                >
                  Dichiaro di aver letto le{" "}
                  <span
                    className="regular-medium hover:underline cursor-pointer hover:underline-offset-1 !text-primaryDesign"
                    onClick={() => {
                      if (!dev) {
                        privacyModal.onOpen();
                      }
                    }}
                  >
                    Privacy Policy
                  </span>
                </p>
              </div>
            </div>
            <div
              className="w-full flex flex-row items-center justify-center mt-[20px]"
            >
              <Button
                height={55}
                width={160}
                onClick={() => {
                  if (!dev) {
                    onPressContactBtn();
                  }
                }}
                className="scale-90 md:scale-100 xl:scale-105"
                animation
                disabled={isLoafing}
              >
                <p>Contattaci</p>
              </Button>
            </div>
          </div>

          {/* MAP */}
          <div
            className="lg:h-full h-[300px] w-[100%] lg:w-[50%]"
          >
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleCourse;
