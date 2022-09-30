import { Specialist } from "@prisma/client";

export const General_Illness_ID = "6336621bf710ac1f2ed76a8e";
export const Heart_and_specialist_ID = "63366231f710ac1f2ed76a8f";
export const Teeth_and_mouth_ID = "6336624df710ac1f2ed76a90";
export const Ear_nose_Throat_ID = "63366261f710ac1f2ed76a91";

export const specialists: Omit<Specialist, "createdAt" | "updatedAt">[] = [
  {
    id: General_Illness_ID,
    name: "အထွေထွေရောဂါ",
  },
  {
    id: Heart_and_specialist_ID,
    name: "နှလုံးရော အထူးကု",
  },
  {
    id: Teeth_and_mouth_ID,
    name: "သွားနှင့် ခံတွင်း",
  },
  {
    id: Ear_nose_Throat_ID,
    name: "နား ၊ နှာခေါင်း ၊ လည်ချောင်း",
  },
];
