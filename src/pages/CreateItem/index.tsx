import React from "react";
import { UploadDropzone } from "@bytescale/upload-widget-react";

import style from "./CreateItem.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateItem: React.FC = () => {
  const options = {
    apiKey: "public_223k2VLD9LX922qWWM7P1iwhyWUB",
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    locale: {
      uploadImageBtn: "Загрузить изображение",
      orDragDropImage: "…или перетащите изображение.",
      finishBtn: "Загрузить",
      cancelBtn: "отмена",
      cancelBtnClicked: "отменяем",
      cancelPreviewBtn: "Отменить",
      continueBtn: "Продолжить",
      cropBtn: "Обрезать",
      finishBtnIcon: true,
      removeBtn: "удалить",
      removeBtnClicked: "удаление",
      submitBtnError: "Ошибка!",
      unsupportedFileType: "Тип этого файла не поддерживается.",
      submitBtnLoading: "Пожалуйста подождите...",
    },
    path: {
      folderPath: "/uploads",
      folderPathVariablesEnabled: false,
      fileNameVariablesEnabled: false,
    },
    showFinishButton: true,
    styles: {
      colors: {
        primary: "#2a80ae",
      },
    },
  };
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [errorImageUrl, setErrorImageUrl] = React.useState("");
  const [errorTitle, setErrorTitle] = React.useState("");
  const [errorDescription, setErrorDescription] = React.useState("");

  const checkError = () => {
    let hasError = false;

    if (title.length < 3) {
      setErrorTitle("Заголовок должен быть больше 3 символов");
      hasError = true;
    } else {
      setErrorTitle("");
    }

    if (description.length < 10) {
      setErrorDescription("Описание должно быть больше 10 символов");
      hasError = true;
    } else {
      setErrorDescription("");
    }

    if (imageUrl.length === 0) {
      setErrorImageUrl("Загрузите картинку для карточки");
      hasError = true;
    } else {
      setErrorImageUrl("");
    }

    return hasError;
  };

  const postItem = async () => {
    const hasError = checkError();

    if (hasError) return;

    try {
      await axios.post("https://7d247ed412521517.mokky.dev/items", {
        imageUrl,
        title,
        description,
      });
      alert("Карточка успешно создана");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.content}>
      <h1>Создайте свою карточку</h1>
      {imageUrl ? (
        <img src={imageUrl} alt="preview" className={style.content_png} />
      ) : (
        <>
          <UploadDropzone
            options={options}
            onComplete={(files) => {
              const uploadedUrl = files[0]?.fileUrl;
              setImageUrl(uploadedUrl);
            }}
            onUpdate={({ uploadedFiles }) =>
              console.log(uploadedFiles.map((x) => x.fileUrl).join("\n"))
            }
            width="450px"
            height="375px"
          />
          {errorImageUrl && (
            <p className={style.content_error}>{errorImageUrl}</p>
          )}
        </>
      )}
      <>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className={style.content_title}
          placeholder="Введите заголовок"
        />
        {errorTitle && <p className={style.content_error}>{errorTitle}</p>}
      </>
      <>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание"
        ></textarea>
        {errorTitle && (
          <p className={style.content_error}>{errorDescription}</p>
        )}
      </>
      <button onClick={postItem} className={style.content_btn}>
        Загрузить
      </button>
    </div>
  );
};

export default CreateItem;
