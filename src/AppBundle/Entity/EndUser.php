<?php
/**
 * Created by PhpStorm.
 * User: marko
 * Date: 10.7.17.
 * Time: 23.16
 */

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as SRL;

/**
 * @ORM\Entity
 * @ORM\Table(name="end_user")
 * @SRL\XmlRoot("user")
 */
class EndUser implements AdvancedUserInterface, \Serializable
{
    /**
     * @Assert\Type("integer")
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @SRL\Type("integer")
     */
    private $user_id;
    /**
     * @Assert\Email(message="Provided email is not valid", checkMX = true)
     * @ORM\Column(type="string", unique=true)
     * @SRL\Type("string")
     */
    private $username;
    /**
     * @Assert\Type("string")
     * @ORM\Column(type="string")
     * @SRL\Type("string")
     * @SRL\Exclude
     */
    private $password;
    /**
     * @Assert\Regex("/^[A-Za-z]{2,25}$/")
     * @ORM\Column(type="string")
     * @SRL\Type("string")
     */
    private $first_name;
    /**
     * @Assert\Regex("/^[A-Za-z]{2,25}$/")
     * @ORM\Column(type="string")
     * @SRL\Type("string")
     */
    private $last_name;
    /**
     * @Assert\Regex("/^.{6,30}$/")
     * @SRL\Exclude
     */
    private $plainPassword;
    /**
     * @ORM\Column(type="boolean")
     */
    private $is_enabled = 1;
    /**
     * @Assert\DateTime()
     * @ORM\Column(type="datetime")
     * @SRL\Type("DateTime")
     */
    private $date_time;

    public function __construct() {
        $this->date_time = new \DateTime();
    }

    /**
     * @return mixed
     */
    public function getDateTime()
    {
        return $this->date_time;
    }

    /**
     * @param mixed $date_time
     */
    public function setDateTime($date_time)
    {
        $this->date_time = $date_time;
        return $this;
    }

    public function getRoles()
    {
        return array('ROLE_USER');
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getSalt()
    {
        return null;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function eraseCredentials()
    {
    }

    /**
     * @return mixed
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * @param mixed $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
        return $this;
    }

    /**
     * @param mixed $roles
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;
        return $this;
    }



    /**
     * @param mixed $is_active
     */
    public function setIsEnabled($is_enabled)
    {
        $this->is_enabled = $is_enabled;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param mixed $plainPassword
     */
    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getFirstName()
    {
        return $this->first_name;
    }

    /**
     * @param mixed $first_name
     */
    public function setFirstName($first_name)
    {
        $this->first_name = $first_name;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLastName()
    {
        return $this->last_name;
    }

    /**
     * @param mixed $last_name
     */
    public function setLastName($last_name)
    {
        $this->last_name = $last_name;
        return $this;
    }

    public function isAccountNonExpired()
    {
        return true;
    }

    public function isAccountNonLocked()
    {
        return true;
    }

    public function isCredentialsNonExpired()
    {
        return true;
    }

    public function isEnabled()
    {
        return $this->is_enabled;
    }

    public function serialize()
    {
        return serialize(array(
            $this->user_id,
            $this->username,
            $this->password,
        ));
    }

    public function unserialize($serialized)
    {
        list (
            $this->user_id,
            $this->username,
            $this->password,
            ) = unserialize($serialized);
    }

}