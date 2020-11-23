function Footer() {
  return (
    <footer className="bg-blue-500">
      <ul className="flex items-center justify-between max-w-4xl p-4 mx-auto text-sm text-white md:p-8">
        <li>
          Created by{" "}
          <a href="https://norman.life" target="_blank" className="font-bold">
            Daniel Norman
          </a>
        </li>

        <li>
          <a
            href="https://github.com/2color/"
            target="_blank"
            className="font-bold"
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
