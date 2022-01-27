import React from "react";

export default function ToggleButton({
  domain,
  style,
  styles,
  state,
  onClick,
}) {
  return (
    <button
      key={domain.id}
      type="button"
      id={domain.id}
      className={
        `btn ${style ? domain.className : ""} ${styles.tabBtn} ${
          style ? style.card_svg : ""
        }` + (state == domain.id ? ` ${styles.tabBtnActive}` : "")
      }
      onClick={onClick}
    >
      {domain.devDomainName}
    </button>
  );
}
