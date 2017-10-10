<?php
/**
 * Created by PhpStorm.
 * User: M4rk0
 * Date: 9/24/2017
 * Time: 5:16 PM
 */

namespace AppBundle\Controller;

use AppBundle\Service\FileUploader;
use JMS\Serializer\SerializerBuilder;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ProfileController extends Controller
{

    /**
     * @Route("/profile/{rUserId}", name="profile", requirements={"rUserId": "\d+"})
     */
    public function profileAction(Request $request, $rUserId)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository("AppBundle:EndUser")->find($rUserId);

        return $this->render('profile/profile.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
            'user' => $user
        ]);
    }

    /**
     * @Route("/profile/picture", name="profilePicture")
     */
    public function profilePictureAction(Request $request, FileUploader $fileUploader) {
        $user = $this->get('security.token_storage')->getToken()->getUser();

        $pictureFile = $request->files->get("profilePicture");
        $pictureData = json_decode($request->request->get('pictureData'));

        $fileName = $fileUploader->uploadProfilePicture($pictureFile, $pictureData, $user->getUserId());

        $em = $this->getDoctrine()->getManager();
        $user->setProfilePicture($fileName);
        $em->persist($user);
        $em->flush();

        return new JsonResponse(array('data' => $pictureData), 200);
    }

}