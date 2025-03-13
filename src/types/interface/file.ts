export interface FileType {
  id: string;
  file: File;
  fileInfo? : FileInfoType
}

export interface FileInfoType {
  boardNum: string;
  contentType: string
  fileExtension: string
  fileName : string
  filePath: string
  id: string
  minioDataUrl: string
  size: number;
  status: boolean
  update: Date | null;
  createAt: Date;
}

export interface FileDeleteIdList {
  fileIds: string[];
}