function Ping() {
  return (
    <strong>
      <span style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <i className="ping-animation" />
        <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "inline-flex", width: 10, height: 10, backgroundColor: "white", borderRadius: "50%" }}></span>
      </span>
    </strong>
  );
}

export default Ping;
