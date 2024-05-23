import { ApiProperty } from '@nestjs/swagger';
import { CredentialSupported, MetadataDisplay } from '@sphereon/oid4vci-common';
import { Column, Entity, PrimaryColumn } from 'typeorm';

class IssuerMetadataLogo {
  url: string;
  alt_text: string;
}

class CredentialIssuer {
  name: string;
  locale: string;
  logo?: IssuerMetadataLogo;
}

export enum CredentialStatus {
  REVOKED = 'revoked',
}

@Entity()
export class Credential {
  /**
   * ID of the credential, has to be unique in combination with the user id.
   */
  @PrimaryColumn({ primary: true })
  id: string;

  /**
   * The user that owns the key
   */
  @Column({ primary: true })
  user: string;

  /**
   * The value of the credential
   */
  @Column()
  value: string;

  /**
   * Metadata to render the display
   */
  @Column({ nullable: true, type: 'json' })
  metaData: CredentialSupported;

  /**
   * Metadata for the issuer representation
   */
  @Column({ nullable: true, type: 'json' })
  @ApiProperty({ type: CredentialIssuer })
  issuer: MetadataDisplay;

  /**
   * The not before date of the credential
   */
  @Column({ nullable: true })
  nbf?: number;

  /**
   * The expiration date of the credential
   */
  @Column({ nullable: true })
  exp?: number;

  /**
   * The status of the credential, if not set it's valid
   */
  @Column({ nullable: true })
  status?: CredentialStatus;
}
