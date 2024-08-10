import { scrollToTop } from "../../hooks/useBackTop";

function BtnBackTop() {
  return <button type="button" id="goTop" title="Back To Top" className="back-to-top uil uil-angle-double-up" onClick={scrollToTop}></button>;
}

export default BtnBackTop;
