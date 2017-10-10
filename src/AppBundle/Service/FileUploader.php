<?php

namespace AppBundle\Service;

use Intervention\Image\ImageManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    private $targetDir;

    public function __construct($targetDir)
    {
        $this->targetDir = $targetDir;
    }

    public function uploadProfilePicture(UploadedFile $file, $pictureMeta, $location, $userId)
    {
        $fileName = $userId.'.'.$file->guessExtension();

        $this->cropAndSave($pictureMeta->x, $pictureMeta->y, $pictureMeta->w, $pictureMeta->h, $pictureMeta->scale,
            $file->getRealPath(), realpath($location . '/' . $fileName));

        return $fileName;
    }

    function cropAndSave($startX, $startY, $width, $height, $scale, $imagePath, $newPath = null) {
        // create an image manager instance with favored driver
        $manager = new ImageManager(array('driver' => 'imagick'));

        // to finally create image instances
        $imagick = $manager->make($imagePath);
        $newWidth = $imagick->width() * $scale;

        $imagick->widen((int)$newWidth);

        //Crop to desired width and height.
        //Note: the width and height has to be same with what you set on your Guillotine config when instantiating it.
        $imagick->crop($width, $height, $startX, $startY);

        //Finally, Save your file
        $imagick->save($newPath);
    }

    public function getTargetDir()
    {
        return $this->targetDir;
    }
}