import ghost from "../assets/SEA-Icon-1x1.png";
export default function Footer() {
  return (
    <footer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            width: "50px",
            height: "50px",
            alignItems: "center",
            paddingRight: "15px",
          }}
          src={ghost}
        />
        <span style={{ alignItems: "center" }}>good luck next week</span>{" "}
      </div>
    </footer>
  );
}
