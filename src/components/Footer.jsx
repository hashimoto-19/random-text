function Footer() {
  return (
    <footer className="text-center">
      <p className="text-gray-700">
        Created by{" "}
        <a className="text-blue-600" href="#" target="_blank" rel="noreferrer">
          @your-handle
        </a>{" "}
        &copy; {new Date().toLocaleDateString("ja-JP")}
      </p>
    </footer>
  );
}
export default Footer;
