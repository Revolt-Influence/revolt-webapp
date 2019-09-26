import React from 'react'
import equal from 'fast-deep-equal'
import { Flex, Box } from '@rebass/grid'
import { FormInputLabel, FormInput, FormTextarea, FormSelect } from '../styles/Form'
import { ICampaignGift, CurrencyType } from '../models/Campaign'
import DropImage from './DropImage'
import SplitView from './SplitView'
import CheckBox from './CheckBox'

interface ICampaignBriefGift {
  gift: ICampaignGift
  setGift: (newGift: ICampaignGift) => void
}

const CampaignBriefGift: React.FC<ICampaignBriefGift> = ({ gift, setGift }) => {
  // Use a ref to prevent stale data in the event handle
  const giftRef = React.useRef<ICampaignGift>()
  React.useEffect(() => {
    giftRef.current = gift
  })
  const handlePictureDrop = (newUrl: string) => {
    setGift({ ...giftRef.current, picture: newUrl })
  }

  return (
    <SplitView title="Détails du cadeau" ratio={4 / 12} stacked>
      <>
        <Flex flexDirection="row" alignItems="flex-start" flexWrap="wrap">
          <Box width={[1, 1, 6 / 12]} pr={[0, 0, '1rem']}>
            {/* Gift name */}
            <FormInputLabel>
              Nom du cadeau
              <FormInput
                value={gift.name}
                onChange={e => setGift({ ...gift, name: e.target.value })}
                hasLabel
              />
            </FormInputLabel>
            {/* Show gift value or not */}
            <CheckBox
              isChecked={gift.valueIsShown}
              handleClick={() => {
                setGift({
                  ...gift,
                  valueIsShown: !gift.valueIsShown,
                  currency: 'Euro',
                  value: gift.value || 0,
                })
              }}
              text="Afficher la valeur du cadeau"
            />
            {/* Actual gift value */}
            {gift.valueIsShown && (
              <>
                <FormInputLabel>
                  Devise
                  <FormSelect
                    value={gift.currency}
                    onChange={e => setGift({ ...gift, currency: e.target.value as CurrencyType })}
                    fullWidth
                  >
                    <option value="Euro">Euro</option>
                    <option value="Pound Sterling">Pound Sterling</option>
                    <option value="US Dollar">US Dollar</option>
                  </FormSelect>
                </FormInputLabel>
                <FormInputLabel>
                  Valeur du cadeau (en {gift.currency})
                  <FormInput
                    value={gift.value}
                    onChange={e => setGift({ ...gift, value: Number.parseFloat(e.target.value) })}
                    placeholder="100"
                    hasLabel
                    type="number"
                  />
                </FormInputLabel>
              </>
            )}
            <FormInputLabel>
              Lien vers plus de détails
              {/* Link to more details */}
              <FormInput
                value={gift.link}
                onChange={e => setGift({ ...gift, link: e.target.value })}
                placeholder="URL"
                hasLabel
              />
            </FormInputLabel>
          </Box>
          {/* Photo upload */}
          <Box width={[1, 1, 6 / 12]} pl={[0, 0, '1rem']} mt={['15px', 0, 0]}>
            <FormInputLabel>
              Photo du cadeau
              <DropImage
                handleDrop={handlePictureDrop}
                preset="campaign_gift"
                currentImage={gift.picture}
                idealSize="800x600 pixels (4:3)"
              />
            </FormInputLabel>
          </Box>
        </Flex>
        {/* Other info */}
        <FormInputLabel>
          Description du cadeau
          <FormTextarea
            value={gift.details}
            rows={4}
            onChange={e => setGift({ ...gift, details: e.target.value })}
            hasLabel
          />
        </FormInputLabel>
      </>
    </SplitView>
  )
}

export default React.memo(CampaignBriefGift, (prevProps, newProps) =>
  equal(prevProps.gift, newProps.gift)
)
