function visibility({ key, setIsShow }) {
  setIsShow((prev) => ({ ...prev, [key]: !prev[key] }));
}

export { visibility };
