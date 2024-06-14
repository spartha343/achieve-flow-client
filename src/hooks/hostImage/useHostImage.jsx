const useHostImage = () => {
  return (formData) =>
    fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST_KEY
      }`,
      {
        method: "POST",
        body: formData
      }
    )
      .then((res) => res.json())
      .then(({ data }) => data.display_url);
};

export default useHostImage;
