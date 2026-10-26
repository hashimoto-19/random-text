function Footer() {
  return (
    <footer className="text-center">
      <p className="text-gray-700">
        Created by{" "}
        <a
          className="text-blue-600"
          href="https://hashimoto-19.github.io/"
          target="_blank"
          rel="noreferrer"
        >
          hashimoto
        </a>{" "}
        &copy; {new Date().toLocaleDateString("ja-JP")}
      </p>
    </footer>
  );
}
export default Footer;
