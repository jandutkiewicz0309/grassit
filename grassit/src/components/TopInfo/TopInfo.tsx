import { Component } from "solid-js";
import { TbPhoneCall } from "solid-icons/tb";
import { TbMailFilled } from "solid-icons/tb";
import { TbClockFilled } from "solid-icons/tb";
import "./TopInfo.css";

export interface TopInfoProps {
  phone: string;
  email: string;
}

export const TopInfo: Component<TopInfoProps> = (props) => {
  return (
    <div class="top-info-container">
      <div class="top-info-item">
        <TbPhoneCall size={16} class="top-info-icon" />
        <span class="top-info-text">{props.phone}</span>
      </div>
      <div class="top-info-item">
        <TbMailFilled size={16} class="top-info-icon" />
        <span class="top-info-text">{props.email}</span>
      </div>
      <div class="top-info-item">
        <TbClockFilled size={16} class="top-info-icon" />
        <span class="top-info-text">pon-pt 9:00-19:00 / sob 10:00-14:00</span>
      </div>
    </div>
  );
};
