import React from 'react'
import { IPostalAddress } from '../models/Creator'
import { FormInputLabel, FormInput } from '../styles/Form'
import { Row, Col } from '../utils/grid'

interface IPostalAddressForm {
  address: IPostalAddress
  handleChange: (params: { type: string; payload: string }) => any
}

const PostalAddressForm: React.FC<IPostalAddressForm> = ({ address, handleChange }) => (
  <>
    <FormInputLabel noMargin>
      Prénom
      <FormInput
        value={address.firstName}
        onChange={e => handleChange({ type: 'firstName', payload: e.target.value })}
        hasLabel
      />
    </FormInputLabel>
    <FormInputLabel>
      Nom
      <FormInput
        value={address.lastName}
        onChange={e => handleChange({ type: 'lastName', payload: e.target.value })}
        hasLabel
      />
    </FormInputLabel>
    <FormInputLabel style={{ paddingTop: 0 }}>
      Adresse où livrer le produit
      <FormInput
        type="text"
        value={address.address}
        onChange={e => handleChange({ type: 'address', payload: e.target.value })}
        placeholder="4 rue de la Paix"
        hasLabel
      />
    </FormInputLabel>
    <FormInputLabel style={{ paddingTop: 0 }}>
      Adresse ligne 2 (facultatif)
      <FormInput
        type="text"
        value={address.addressLine2}
        onChange={e => handleChange({ type: 'addressLine2', payload: e.target.value })}
        placeholder="Appartement B"
        hasLabel
      />
    </FormInputLabel>
    <Row justify="space-between">
      <Col size={5 / 12} padding="right">
        <FormInputLabel withMargin>
          Code postal
          <FormInput
            type="text"
            value={address.postalCode}
            onChange={e => handleChange({ type: 'postalCode', payload: e.target.value })}
            placeholder="75002"
            hasLabel
          />
        </FormInputLabel>
      </Col>
      <Col>
        <FormInputLabel withMargin>
          Ville
          <FormInput
            type="text"
            value={address.city}
            onChange={e => handleChange({ type: 'city', payload: e.target.value })}
            hasLabel
          />
        </FormInputLabel>
      </Col>
    </Row>
    <FormInputLabel style={{ paddingTop: 0 }}>
      Pays
      <FormInput
        type="text"
        value={address.country}
        onChange={e => handleChange({ type: 'country', payload: e.target.value })}
        hasLabel
      />
    </FormInputLabel>
  </>
)

export default PostalAddressForm
