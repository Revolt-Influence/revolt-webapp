import React from 'react'
import styled from 'styled-components'
import { ContainerBox } from '../styles/grid'
import PageHeader from '../components/PageHeader'
import { palette } from '../utils/colors'
import { setFont } from '../utils/styles'
import { usePageTitle } from '../utils/hooks'
import { AMBASSADOR_BRAND_REWARD } from '../components/AmbassadorProgramBrands'
import { AMBASSADOR_CREATOR_REWARD } from '../components/AmbassadorProgramCreators'

const Styles = styled(ContainerBox)`
  p {
    margin-bottom: 2rem;
  }
  a {
    color: ${palette.blue._600};
  }
  ul,
  ol {
    list-style: unset;
    margin-bottom: 1rem;
    li {
      margin-left: 2rem;
    }
  }
  h3 {
    ${setFont(600, 'big')}
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`

const TermsAndConditions: React.FC<{}> = () => {
  usePageTitle("Conditions générales d'utilisation")
  return (
    <Styles width={[1, 10 / 12, 6 / 12]} mx="auto">
      <PageHeader title="Conditions générales d'utilisation" />
      <p>En vigueur au 1er janvier 2019</p>
      <p>
        Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet
        l'encadrement juridique des modalités de mise à disposition du site et des services par et
        de définir les conditions d’accès et d’utilisation des services par « l'Utilisateur ».
      </p>
      <p>
        Les présentes CGU sont accessibles sur le site à la rubrique «CGU». Toute inscription ou
        utilisation du site implique l'acceptation sans aucune réserve ni restriction des présentes
        CGU par l’utilisateur. Lors de l'inscription sur le site via le Formulaire d’inscription,
        chaque utilisateur accepte expressément les présentes CGU en cochant la case précédant le
        texte suivant : « Je reconnais avoir lu et compris les CGU et je les accepte ».
      </p>
      <p>
        En cas de non-acceptation des CGU stipulées dans le présent contrat, l'Utilisateur se doit
        de renoncer à l'accès des services proposés par le site.
      </p>
      <p>
        Revolt Influence se réserve le droit de modifier unilatéralement et à tout moment le contenu
        des présentes CGU.
      </p>
      <h3>Article 1 : Les mentions légales</h3>
      <p>
        L'édition du site Revolt Influence est assurée par la Société Micro Entreprise Nicolas
        Vrillac au capital de 100 euros, immatriculée au RCS de Nanterre sous le numéro 835 136 680,
        dont le siège social est situé au 10 Rue Pierret
      </p>
      <p>Adresse e-mail : nicolas@revolt.club</p>
      <p>Le Directeur de la publication est : Nicolas Vrillac</p>
      <p>
        L'hébergeur du site Revolt Influence est la société OVH, dont le siège social est situé au 2
        rue Kellermann - 59100 Roubaix - France, avec le numéro de téléphone : 09 72 10 11 12.
      </p>
      <h3>Article 2 : Accès au site</h3>
      <p>Le site internet propose les services suivants :</p>
      <p>
        Le but de l'application web Revolt Influence est de permettre aux entreprises de gérer leurs
        campagnes d'influence marketing en ligne.
      </p>
      <p>
        Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à
        Internet. Tous les frais supportés par l'Utilisateur pour accéder au service (matériel
        informatique, logiciels, connexion Internet, etc.) sont à sa charge.
      </p>
      <p>
        L’Utilisateur non membre n'a pas accès aux services réservés. Pour cela, il doit s’inscrire
        en remplissant le formulaire. En acceptant de s’inscrire aux services réservés,
        l’Utilisateur membre s’engage à fournir des informations sincères et exactes concernant son
        état civil et ses coordonnées, notamment son adresse email.
      </p>
      <p>
        Pour accéder aux services, l’Utilisateur doit ensuite s'identifier à l'aide de son
        identifiant et de son mot de passe qui lui seront communiqués après son inscription.
      </p>
      <p>
        Tout Utilisateur membre régulièrement inscrit pourra également solliciter sa désinscription
        en se rendant à la page dédiée sur son espace personnel. Celle-ci sera effective dans un
        délai raisonnable.
      </p>
      <p>
        Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du
        site ou serveur et sous réserve de toute interruption ou modification en cas de maintenance,
        n'engage pas la responsabilité de Revolt Influence. Dans ces cas, l’Utilisateur accepte
        ainsi ne pas tenir rigueur à l’éditeur de toute interruption ou suspension de service, même
        sans préavis.
      </p>
      <p>
        L'Utilisateur a la possibilité de contacter le site par messagerie électronique à l’adresse
        email de l’éditeur communiqué à l’ARTICLE 1.
      </p>
      <h3>Article 3 : Collecte des données</h3>
      <p>
        Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles
        dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à
        l'informatique, aux fichiers et aux libertés.
      </p>
      <p>
        En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur
        dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données
        personnelles. L'Utilisateur exerce ce droit par mail à l'adresse mail nicolas@revolt.club
      </p>
      <h3>Article 4 : Propriété intellectuelle</h3>
      <p>
        Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font
        l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement
        par le droit d'auteur.
      </p>
      <p>
        L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction,
        publication, copie des différents contenus. Il s'engage à une utilisation des contenus du
        site dans un cadre strictement privé, toute utilisation à des fins commerciales et
        publicitaires est strictement interdite.
      </p>
      <p>
        Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans
        l’autorisation expresse de l’exploitant du site Internet constituerait une contrefaçon
        sanctionnée par l’article L 335-2 et suivants du Code de la propriété intellectuelle.
      </p>
      <p>
        Il est rappelé conformément à l’article L122-5 du Code de propriété intellectuelle que
        l’Utilisateur qui reproduit, copie ou publie le contenu protégé doit citer l’auteur et sa
        source.
      </p>
      <h3>Article 5 : Responsabilité</h3>
      <p>
        Les sources des informations diffusées sur le site Revolt Influence sont réputées fiables
        mais le site ne garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.
      </p>
      <p>
        Les informations communiquées sont présentées à titre indicatif et général sans valeur
        contractuelle. Malgré des mises à jour régulières, le site Revolt Influence ne peut être
        tenu responsable de la modification des dispositions administratives et juridiques survenant
        après la publication. De même, le site ne peut être tenue responsable de l’utilisation et de
        l’interprétation de l’information contenue dans ce site.
      </p>
      <p>
        L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation du mot de passe,
        quelle que soit sa forme, est interdite. Il assume les risques liés à l'utilisation de son
        identifiant et mot de passe. Le site décline toute responsabilité.
      </p>
      <p>
        Le site Revolt Influence ne peut être tenu pour responsable d’éventuels virus qui pourraient
        infecter l’ordinateur ou tout matériel informatique de l’Internaute, suite à une
        utilisation, à l’accès, ou au téléchargement provenant de ce site.
      </p>
      <p>
        La responsabilité du site ne peut être engagée en cas de force majeure ou du fait
        imprévisible et insurmontable d'un tiers.
      </p>
      <h3>Article 6 : Liens hypertextes</h3>
      <p>
        Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en
        cliquant sur ces liens, il sortira du site Revolt Influence. Ce dernier n’a pas de contrôle
        sur les pages web sur lesquelles aboutissent ces liens et ne saurait, en aucun cas, être
        responsable de leur contenu.
      </p>
      <h3>Article 7 : Cookies</h3>
      <p>
        L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer
        automatiquement sur son logiciel de navigation.
      </p>
      <p>
        Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l’ordinateur
        de l’Utilisateur par votre navigateur et qui sont nécessaires à l’utilisation du site Revolt
        Influence. Les cookies ne contiennent pas d’information personnelle et ne peuvent pas être
        utilisés pour identifier quelqu’un. Un cookie contient un identifiant unique, généré
        aléatoirement et donc anonyme. Certains cookies expirent à la fin de la visite de
        l’Utilisateur, d’autres restent.
      </p>
      <p>
        L’information contenue dans les cookies est utilisée pour améliorer le site Revolt
        Influence. En naviguant sur le site, L’Utilisateur les accepte. L’Utilisateur doit toutefois
        donner son consentement quant à l’utilisation de certains cookies.
      </p>
      <p>
        A défaut d’acceptation, l’Utilisateur est informé que certaines fonctionnalités ou pages
        risquent de lui être refusées. L’Utilisateur pourra désactiver ces cookies par
        l’intermédiaire des paramètres figurant au sein de son logiciel de navigation.
      </p>
      <h3>Article 8 : Publication par l’Utilisateur</h3>
      <p>Le site permet aux membres de publier des campagnes d'influence marketing</p>
      <p>
        Dans ses publications, le membre s’engage à respecter les règles de la Netiquette (règles de
        bonne conduite de l’internet) et les règles de droit en vigueur. Le site peut exercer une
        modération sur les publications et se réserve le droit de refuser leur mise en ligne, sans
        avoir à s’en justifier auprès du membre.
      </p>
      <p>
        Le membre reste titulaire de l’intégralité de ses droits de propriété intellectuelle. Mais
        en publiant une publication sur le site, il cède à la société éditrice le droit non exclusif
        et gratuit de représenter, reproduire, adapter, modifier, diffuser et distribuer sa
        publication, directement ou par un tiers autorisé, dans le monde entier, sur tout support
        (numérique ou physique), pour la durée de la propriété intellectuelle. Le Membre cède
        notamment le droit d'utiliser sa publication sur internet et sur les réseaux de téléphonie
        mobile.
      </p>
      <p>
        La société éditrice s'engage à faire figurer le nom du membre à proximité de chaque
        utilisation de sa publication.
      </p>
      <p>
        Tout contenu mis en ligne par l'Utilisateur est de sa seule responsabilité. L'Utilisateur
        s'engage à ne pas mettre en ligne de contenus pouvant porter atteinte aux intérêts de
        tierces personnes. Tout recours en justice engagé par un tiers lésé contre le site sera pris
        en charge par l'Utilisateur.
      </p>
      <p>
        Le contenu de l'Utilisateur peut être à tout moment et pour n'importe quelle raison supprimé
        ou modifié par le site, sans préavis.
      </p>
      <h3>Article 9 : Fraude et cas exceptionnels</h3>
      <p>
        Le rôle de Revolt se limite à mettre en relation influenceurs et les entreprises. Nous ne
        nous engageons aucunement à ce que les influenceurs ou bien les marques inscrites ou
        référencées sur notre plateforme réalisent un paiement, une publication sponsorisée ou un
        envoi de produit.
      </p>
      <p>
        Nous ne pourrons donc pas être tenus responsables en cas de manoeuvres frauduleuses (vol de
        produits, escroquerie en tout genre, retards de paiements …) menées par des influenceurs
        inscrits ou référencés sur notre plateforme à l’encontre des marques.
      </p>
      <p>
        Egalement, nous ne pourrons pas être tenus responsables en cas de manoeuvres frauduleuses
        (vol de produits, escroquerie en tout genre, retards de paiements …) menées par des marques
        inscrites ou référencées sur notre plateforme à l’encontre des influenceurs.
      </p>
      <p>
        De plus, nous ne pourrons également être tenus responsable en cas de non-réponse des
        influenceurs lors de la création d’une campagne sur notre application. Nous ne nous
        engageons pas à ce que la campagne génère des ventes, il en va de la responsabilité de la
        marque.
      </p>
      <h3>Article 10 : Tarification et paiements</h3>
      <p>Le système de paiement sécurisé de Revolt Influence est géré par l’entreprise Stripe.</p>
      <p>
        Coordonnées : 510 Townsend Street, San Francisco, CA 94103, États-Unis, Destinataire: Stripe
        Legal
      </p>
      <p>
        Notre système de tarification par abonnement à renouvellement automatique vous permet
        d’accéder aux services dits “premiums” de l’application pour une durée de 30 jours.
      </p>
      <h3>Article 11 : Droit à l’image et promotion</h3>
      <p>
        En vous inscrivant sur l’application en tant que “marque” ou qu’ ”influenceur” vous acceptez
        que Revolt Influence puisse utiliser votre nom, logo, photos ou tout autre réalisation dans
        un but promotionnel.
      </p>
      <h3>Article 12 : Droit applicable et juridiction compétente</h3>
      <p>
        La législation française s'applique au présent contrat. En cas d'absence de résolution
        amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents
        pour en connaître.
      </p>
      <p>
        Pour toute question relative à l’application des présentes CGU, vous pouvez joindre
        l’éditeur aux coordonnées inscrites à l’ARTICLE 1.
      </p>
      <h3>Article 13: Ambassador program</h3>
      <p>
        Influencers can recommend Revolt to a brand via our Ambassador Program. They can only
        recommend a brand if the brand has contacted the influencer first. Influencers have to enter
        the email that the brand used to contact them. Then Revolt contacts the brand on the
        influencer's behalf, and recommends that they manage their campaign on Revolt.
      </p>
      <p>
        Revolt can pay the influencer {AMBASSADOR_BRAND_REWARD} for each brand recommended via the
        program if the following conditions are all met:
      </p>
      <ul>
        <li>The brand creates a campaign on Revolt</li>
        <li>
          Revolt approves the campaign. Only quality campaigns are accepted. Revolt reserves the
          right to tell what is a qualified product, based on the product's quality, the brand's
          reputation and the brand's budget.
        </li>
        <li>The brand accepted at least 1 collab request on its campaign</li>
      </ul>
      <p>
        Influencers can also invite other influencers by sending them a tracked signup link. Every
        time an influencer signs up using this link, Revolt gives ${AMBASSADOR_CREATOR_REWARD} USD
        to the ambassador if the following conditions are met:
      </p>
      <ul>
        <li>The influencer signed up using the tracked link</li>
        <li>The influencer had a big enough audience to be allowed</li>
        <li>The influencer completed at least 1 collab with a brand</li>
      </ul>
    </Styles>
  )
}

export default TermsAndConditions
