"use client";
import { Checkbox } from "@/components/ui/checkbox";

const ClientCheckbox = ({ checked }: { checked: boolean }) => {
  return <Checkbox checked={checked} />;
};

export default ClientCheckbox;
