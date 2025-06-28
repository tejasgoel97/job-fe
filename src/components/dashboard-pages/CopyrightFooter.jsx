const CopyrightFooter = () => {
  return (
    <div className="copyright-text">
      <p>
        © {new Date().getFullYear()} UnicronApps{" "}
        <a
          href="https://themeforest.net/user/and Websites"
          target="_blank"
          rel="noopener noreferrer"
        >
          and Websites
        </a>
        . All Right Reserved.
      </p>
    </div>
  );
};

export default CopyrightFooter;
