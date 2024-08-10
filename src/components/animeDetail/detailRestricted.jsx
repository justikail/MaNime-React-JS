import { useState } from "react";

function DetailRestricted() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      {showBanner && (
        <div className="restricted">
          <div className="restricted-container">
            <div className="restricted-image">
              <img src="/img/restricted.png" alt="Restricted" loading="lazy" />
            </div>
            <div className="restricted-warning">
              <h1>PERINGATAN !</h1>
              <span>Peringatan !. Halaman ini mengandung konten dewasa.</span>
              <span>Pertimbangkan kembali untuk mengunjungi halaman ini, Dan pastikan tidak ada anak - anak ataupun remaja dibawah umur disekitar anda !.</span>
              <span>Bijaklah dalam menjadi orang dewasa.</span>
              <span>Regards : MaNime Dev.</span>
            </div>
            <button className="uil uil-times" onClick={() => setShowBanner(false)} title="Close"></button>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailRestricted;
