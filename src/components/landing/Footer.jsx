const style = {
  textDecoration: "none",
  color: "white",
  marginRight: "0.3rem",
};

const githubProfiles = [
  {
    name: "Aritra",
    link: "https://github.com/aritrasen12345",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div
      style={{
        backgroundColor: "#1B1B1B",
        textAlign: "center",
        color: "white",
        width: "100%",
        padding: "2rem 0 2rem 0",
      }}
    >
      <p>Copyright@{year}</p>
      <p>
        Made with 💖 by Aritra (
        {githubProfiles.map((profile, idx) => (
          <a key={idx} style={style} href={profile.link}>
            {profile.name}
          </a>
        ))}
        )
      </p>
    </div>
  );
};

export default Footer;
