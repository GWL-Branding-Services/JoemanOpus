import { Group, Image, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

function ImageUpload({ setProfileImage }) {
  const [files, setFiles] = useState([]);
  const theme = useMantineTheme();
  const imageUrl = files[0];
  // useEffect(() => {
  //   setProfileImage(imageUrl);
  // }, [imageUrl]);

  function blobToFile(blob, fileName) {
    const file = new File([blob], fileName, { type: blob.type, lastModified: Date.now() });
    return file;
  }
  
  function handleImageUpload(img) {
    var imageFile = img;
    console.log("Before compressing", img);
    var controller = new AbortController();
  
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 300,
      useWebWorker: true,
      signal: controller.signal,
    };
  
    imageCompression(imageFile, options)
      .then(function (compressedFile) {
        const convertedFile = blobToFile(compressedFile, imageFile.name);
        setProfileImage(convertedFile);
        console.log("After compressing", convertedFile);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  
    // simulate abort the compression after 1.5 seconds
    setTimeout(function () {
      controller.abort(new Error("I just want to stop"));
    }, 7500);
  }
  
  useEffect(() => {
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [files]);
  

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        height={100}
        width={200}
        fit="contain"
        radius="md"
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });
  return (
    <div>
      <Dropzone
        multiple={false}
        accept={IMAGE_MIME_TYPE}
        maxSize={1 * 1024 ** 2}
        onDrop={(files) => {
          setFiles(files);
        }}
        onReject={(files) => {
          console.log("rejected files", files[0]);
          toast.warning(
            files[0].errors[0].code + "! Kindly resize image to 1mb"
          );
        }}
      >
        <Group
          position="center"
          style={{ minHeight: 120, pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" className="text-center" inline>
              Drag images here or click to select files
            </Text>
            <Text
              size="sm"
              className="text-center"
              color="dimmed"
              inline
              mt={7}
            >
              Attach as many files as you like, each file should not exceed 1mb
            </Text>
          </div>
        </Group>
      </Dropzone>

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid>
    </div>
  );
}

export default ImageUpload;
