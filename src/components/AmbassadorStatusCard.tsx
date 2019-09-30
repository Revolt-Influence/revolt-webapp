// import React from 'react'
// import { Box } from '@rebass/grid'
// import { MainLink } from '../styles/Button'
// import { Text } from '../styles/Text'

// const AmbassadorStatusCard: React.FC<{}> = () => {
//   const status = useSelector<IState, AmbassadorStatus>(state => state.session.ambassadorStatus)
//   return (
//     <Box>
//       {status.signups > 0 ? (
//         <>
//           <p>
//             <Text bold color="pink">
//               {status.signups}
//             </Text>{' '}
//             influenceur {status.signups > 1 ? 's se sont inscrits ' : "s'est inscrit "} grâce à
//             votre lien.
//           </p>
//           <p>
//             <Text bold color="pink">
//               {status.activeSignups < 1 ? 'Aucun' : status.activeSignups}
//             </Text>{' '}
//             {status.activeSignups < 2 ? 'a' : 'ont'} réalisé des collabs avec des marques.
//           </p>
//         </>
//       ) : (
//         <p>Personne ne s'est encore inscrit grâce à votre lien de parainnage</p>
//       )}
//       <MainLink to="/creator/ambassador">Voir mon lien de parrainnage</MainLink>
//     </Box>
//   )
// }

// export default AmbassadorStatusCard
