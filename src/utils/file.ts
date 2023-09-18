export type ResizeImageOptions = {
  maxWidth: number;
  maxHeight: number;
  mimeType?: string;
  quality?: number;
};

export const readFile = (file: File): Promise<string | ArrayBuffer> => {
  if (!file) {
    return;
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

const resize = (
  name: string,
  src: CanvasImageSource,
  width: number,
  height: number,
  options: ResizeImageOptions,
  force = false
): Promise<File> => {
  return new Promise((resolveT) => {
    if (!force && (width <= options.maxWidth || height <= options.maxHeight)) {
      return resolveT(null);
    }

    const canvas = document.createElement("canvas");
    if (width > height) {
      if (width > options.maxWidth) {
        height *= options.maxWidth / width;
        width = options.maxWidth;
      }
    } else if (height > options.maxHeight) {
      width *= options.maxHeight / height;
      height = options.maxHeight;
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(src, 0, 0, width, height);

    return ctx.canvas.toBlob(
      (imageBlob) => {
        return resolveT(
          new File([imageBlob], `${width}x${height}_${name}`, {
            type: options.mimeType || "image/jpeg",
          })
        );
      },
      options.mimeType || "image/jpeg",
      options.quality
    );
  });
};

export const resizeImage = (
  file: File,
  options: ResizeImageOptions[]
): Promise<File[]> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      const fileHandle = e.target.result;
      const img = document.createElement("img");
      img.src = fileHandle as string;

      const results = [];
      for (const a of options) {
        const r = await resize(file.name, img, img.width, img.height, a);
        results.push(r || file);
      }

      return resolve(results);
    };

    reader.onerror = (error) => {
      return reject(error);
    };
  });

export const captureVideoThumbnail = (
  file: File,
  seekTo = 0,
  thumbnailOptions: ResizeImageOptions[]
): Promise<File[]> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const fileHandle = e.target.result;
      const videoPlayer = document.createElement("video");
      videoPlayer.src = fileHandle as string;
      videoPlayer.load();
      videoPlayer.addEventListener("error", (ex) => {
        reject(ex);
      });

      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener("loadedmetadata", () => {
        // seek to user defined timestamp (in seconds) if possible
        if (videoPlayer.duration < seekTo) {
          seekTo = videoPlayer.duration;
        }
        // delay seeking or else 'seeked' event won't fire on Safari
        setTimeout(() => {
          videoPlayer.currentTime = seekTo;
        }, 200);
        // extract video thumbnail once seeking is complete
        videoPlayer.addEventListener("seeked", async () => {
          const results = [];
          for (const a of thumbnailOptions) {
            const r = await resize(
              "video_thumbnail.jpg",
              videoPlayer,
              videoPlayer.videoWidth,
              videoPlayer.videoHeight,
              {
                maxWidth: Math.min(a.maxWidth, videoPlayer.videoWidth),
                maxHeight: Math.min(a.maxHeight, videoPlayer.videoHeight),
                mimeType: "image/jpeg",
                quality: 0.9,
              },
              true
            );
            results.push(r);
          }

          resolve(results);
        });
      });
    };

    reader.onerror = (error) => {
      return reject(error);
    };
  });

// extract from mime-db https://github.com/jshttp/mime-db/blob/master/db.json
// we only get supported extensions
export type MimeType = {
  extensions: string[];
  iconName: string;
};

export const SUPPORT_MIME_TYPES: Record<string, MimeType> = {
  "image/gif": {
    iconName: "image",
    extensions: ["gif"],
  },
  "image/jpeg": {
    iconName: "image",
    extensions: ["jpeg", "jpg", "jpe"],
  },
  "image/png": {
    iconName: "image",
    extensions: ["png"],
  },
  "image/svg+xml": {
    iconName: "image",
    extensions: ["svg", "svgz"],
  },
  "application/msword": {
    iconName: "description",
    extensions: ["doc", "dot"],
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    iconName: "description",
    extensions: ["docx"],
  },
  "text/plain": {
    iconName: "text_snippet",
    extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  },
  "text/csv": {
    iconName: "description",
    extensions: ["csv"],
  },
  "application/vnd.ms-excel": {
    iconName: "description",
    extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    iconName: "description",
    extensions: ["xlsx"],
  },
  "application/vnd.ms-powerpoint": {
    iconName: "slideshow",
    extensions: ["ppt", "pps", "pot"],
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    iconName: "slideshow",
    extensions: ["pptx"],
  },
  "application/vnd.apple.pages": {
    iconName: "slideshow",
    extensions: ["pages"],
  },
  "application/vnd.apple.numbers": {
    iconName: "description",
    extensions: ["numbers"],
  },
  "application/vnd.apple.keynote": {
    iconName: "description",
    extensions: ["key"],
  },
  "application/zip": {
    iconName: "archive",
    extensions: ["zip"],
  },
  "application/vnd.rar": {
    iconName: "archive",
    extensions: ["rar"],
  },
  "application/gzip": {
    iconName: "archive",
    extensions: ["gz"],
  },
  "application/x-7z-compressed": {
    iconName: "archive",
    extensions: ["7z"],
  },
  "audio/mp3": {
    iconName: "audiotrack",
    extensions: ["mp3"],
  },
  "audio/mp4": {
    iconName: "audiotrack",
    extensions: ["m4a", "mp4a"],
  },
  "audio/wav": {
    iconName: "audiotrack",
    extensions: ["wav"],
  },
  "audio/wave": {
    iconName: "audiotrack",
    extensions: ["wav"],
  },
  "audio/webm": {
    iconName: "audiotrack",
    extensions: ["weba"],
  },
  "video/mp4": {
    iconName: "movie",
    extensions: ["mp4", "mp4v", "mpg4"],
  },
  "video/mpeg": {
    iconName: "movie",
    extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"],
  },
};

export const IMAGE_DEFAULT_ACCEPT = "image/jpeg, image/png, .svg";
export const FILE_TYPE_PHOTO = "photo";
export const FILE_TYPE_VIDEO = "video";
export const FILE_TYPE_FILE = "file";

export type FileType =
  | typeof FILE_TYPE_PHOTO
  | typeof FILE_TYPE_VIDEO
  | typeof FILE_TYPE_FILE;

export const FILE_EXTENSION_PNG = "png";
export const FILE_EXTENSION_JPG = "jpg";
export const FILE_EXTENSION_JPEG = "jpeg";
export const FILE_EXTENSION_GIF = "gif";
export const FILE_EXTENSION_DOC = "doc";
export const FILE_EXTENSION_DOCX = "docx";
export const FILE_EXTENSION_XLS = "xls";
export const FILE_EXTENSION_XLSX = "xlsx";
export const FILE_EXTENSION_PPT = "ppt";
export const FILE_EXTENSION_PDF = "pdf";
export const FILE_EXTENSION_PPTX = "pptx";
export const FILE_EXTENSION_CAD = "cad";
export const FILE_EXTENSION_PAGES = "pages";
export const FILE_EXTENSION_NUMBERS = "numbers";
export const FILE_EXTENSION_KEY = "key";
export const FILE_EXTENSION_ZIP = "zip";
export const FILE_EXTENSION_RAR = "rar";
export const FILE_EXTENSION_MP4 = "mp4";

export type FileExtension =
  | typeof FILE_EXTENSION_DOC
  | typeof FILE_EXTENSION_DOCX
  | typeof FILE_EXTENSION_GIF
  | typeof FILE_EXTENSION_JPG
  | typeof FILE_EXTENSION_JPEG
  | typeof FILE_EXTENSION_PNG
  | typeof FILE_EXTENSION_PPT
  | typeof FILE_EXTENSION_PPTX
  | typeof FILE_EXTENSION_PDF
  | typeof FILE_EXTENSION_CAD
  | typeof FILE_EXTENSION_PAGES
  | typeof FILE_EXTENSION_NUMBERS
  | typeof FILE_EXTENSION_KEY
  | typeof FILE_EXTENSION_ZIP
  | typeof FILE_EXTENSION_RAR
  | typeof FILE_EXTENSION_MP4
  | typeof FILE_EXTENSION_XLS
  | typeof FILE_EXTENSION_XLSX;

export const FILE_EXTENSIONS = [
  FILE_EXTENSION_DOC,
  FILE_EXTENSION_DOCX,
  FILE_EXTENSION_GIF,
  FILE_EXTENSION_JPG,
  FILE_EXTENSION_JPEG,
  FILE_EXTENSION_PNG,
  FILE_EXTENSION_PPT,
  FILE_EXTENSION_PPTX,
  FILE_EXTENSION_PDF,
  FILE_EXTENSION_CAD,
  FILE_EXTENSION_PAGES,
  FILE_EXTENSION_NUMBERS,
  FILE_EXTENSION_KEY,
  FILE_EXTENSION_ZIP,
  FILE_EXTENSION_RAR,
  FILE_EXTENSION_MP4,
  FILE_EXTENSION_XLS,
  FILE_EXTENSION_XLSX,
];

const FILE_ICON_IMAGE = "file-image";
const FILE_ICON_FILE = "file";

export const FILE_ICON_NAMES: Record<FileExtension, string> = {
  [FILE_EXTENSION_PDF]: "file-pdf",
  [FILE_EXTENSION_DOC]: "file-word",
  [FILE_EXTENSION_DOCX]: "file-word",
  [FILE_EXTENSION_XLS]: "file-excel",
  [FILE_EXTENSION_XLSX]: "file-excel",
  [FILE_EXTENSION_PPT]: "file-powerpoint",
  [FILE_EXTENSION_PPTX]: "file-powerpoint",
  [FILE_EXTENSION_ZIP]: "file-archive",
  [FILE_EXTENSION_RAR]: "file-archive",
  [FILE_EXTENSION_GIF]: FILE_ICON_IMAGE,
  [FILE_EXTENSION_JPG]: FILE_ICON_IMAGE,
  [FILE_EXTENSION_JPEG]: FILE_ICON_IMAGE,
  [FILE_EXTENSION_PNG]: FILE_ICON_IMAGE,
  [FILE_EXTENSION_CAD]: FILE_ICON_FILE,
  [FILE_EXTENSION_PAGES]: FILE_ICON_FILE,
  [FILE_EXTENSION_NUMBERS]: FILE_ICON_FILE,
  [FILE_EXTENSION_MP4]: FILE_ICON_FILE,
  [FILE_EXTENSION_KEY]: FILE_ICON_FILE,
};

export function parseFileType(extension: string): FileType {
  const type = extension.replace(/\/.*/g, "");
  switch (type) {
    case FILE_TYPE_PHOTO:
    case "image":
      return FILE_TYPE_PHOTO;
    case FILE_TYPE_VIDEO:
      return FILE_TYPE_VIDEO;
    default:
      return FILE_TYPE_FILE;
  }
}

export function isMimeTypeVideo(type: string): boolean {
  return type?.indexOf("video/") === 0;
}

export function isMimeTypeImage(type: string): boolean {
  return type?.indexOf("image/") === 0;
}

export function isMimeTypeAudio(type: string): boolean {
  return type?.indexOf("audio/") === 0;
}

export function isMimeTypeText(type: string): boolean {
  return type?.indexOf("text/") === 0;
}

export function isImageFile(file: any): boolean {
  if (file.raw) {
    return parseFileType(file.raw.type) === FILE_TYPE_PHOTO;
  }

  return file.fileType === FILE_TYPE_PHOTO;
}

export function getFileExtension(filename: string): string {
  const ext = /^.+\.([^.]+)$/.exec(filename);

  return ext === null ? "" : ext[1];
}

export const isKnownExtension = (key: string): boolean => {
  return FILE_EXTENSIONS.includes(key);
};

export function parseIconFile(file: any): string {
  const fileType: FileType = file.raw
    ? parseFileType(file.raw.type)
    : file.fileType;
  const fileName = file.name || file.fileName;
  switch (fileType) {
    case FILE_TYPE_PHOTO:
      return FILE_ICON_IMAGE;
    case FILE_TYPE_FILE:
      return (() => {
        const extension = getFileExtension(fileName);
        return isKnownExtension(extension)
          ? FILE_ICON_NAMES[extension as FileExtension]
          : FILE_ICON_FILE;
      })();
    default:
      return FILE_ICON_FILE;
  }
}

export function parseIconFileURL(file: any): string {
  const basePath = "/icons/";
  const iconFile = parseIconFile(file);
  return `${basePath}${iconFile}.svg`;
}

export const printPrettySize = (size: number, base = "B") => {
  const symbols = ["B", "KB", "MB", "GB"];
  let result = size;
  for (let i = 0; i < symbols.length; i++) {
    if (result < 1024) {
      const baseIndex = symbols.indexOf(base);
      if (baseIndex <= i) {
        return `${result.toFixed(2)}${symbols[i]}`;
      }
      return `${(result / 1024 ** (baseIndex - i)).toFixed(2)}${base}`;
    }
    result = result / 1024;
  }
  return `${result.toFixed(2)}${symbols[symbols.length - 1]}`;
};

export function downloadImageFromURL(url: string, filename: string) {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;
      a.setAttribute("style", "display: none");

      if (filename && filename.length) {
        a.download = filename + ".jpeg";
      }
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}
export function downloadWithNoCorsFromURL(
  url: string,
  filename: string,
  mimeType?: string
) {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;
      a.setAttribute("style", "display: none");

      if (filename && filename.length) {
        a.download = `${filename}${mimeType || ""}`;
      }
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}

export function getBase64Image(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "red";
      // ctx.fil

      return resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (error) => {
      return reject(error);
    };

    img.src = url;
  });
}
