import { CreatureStatBlock } from '../types';
import { EntityDescription } from '../EntityDescription';

export interface StatBlockProps {
  statBlock: CreatureStatBlock
}

const getMod = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const StatBlock = ({
  statBlock
}: StatBlockProps) => {
  return (
    <div>
      <h4>
        {statBlock.name}
      </h4>
      <p>
        {statBlock.size} {statBlock.type}, {statBlock.alignment}
      </p>
      <p>
        <strong>Armor Class:</strong> {statBlock.ac}
      </p>
      <p>
        <strong>Hit Points:</strong> {statBlock.hp}
      </p>
      <p>
        <strong>Speed:</strong> {statBlock.speed}
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">
              STR
            </th>
            <th scope="col">
              DEX              
            </th>
            <th scope="col">
              CON
            </th>
            <th scope="col">
              INT
            </th>
            <th scope="col">
              WIS
            </th>
            <th scope="col">
              CHA
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {statBlock.str}
            </td>
            <td>
              {statBlock.dex}
            </td>
            <td>
              {statBlock.con}
            </td>
            <td>
              {statBlock.int}
            </td>
            <td>
              {statBlock.wis}
            </td>
            <td>
              {statBlock.cha}
            </td>
          </tr>
          <tr>
            <td>
              {getMod(statBlock.str)}
            </td>
            <td>
              {getMod(statBlock.dex)}
            </td>
            <td>
              {getMod(statBlock.con)}
            </td>
            <td>
              {getMod(statBlock.int)}
            </td>
            <td>
              {getMod(statBlock.wis)}
            </td>
            <td>
              {getMod(statBlock.cha)}
            </td>
          </tr>
        </tbody>
      </table>
      {
        statBlock.damageImmunities ? (
          <p>
            <strong>Damage Immunities:</strong> {statBlock.damageImmunities}
          </p>
        ) : null
      }
      {
        statBlock.damageResistances ? (
          <p>
            <strong>Damage Resistances:</strong> {statBlock.damageResistances}
          </p>
        ) : null
      }
      {
        statBlock.damageVulnerabilities ? (
          <p>
            <strong>Damage Vulnerabilities:</strong> {statBlock.damageVulnerabilities}
          </p>
        ) : null
      }
      {
        statBlock.conditionImmunities ? (
          <p>
            <strong>Condition Immunities:</strong> {statBlock.conditionImmunities}
          </p>
        ) : null
      }
      {
        statBlock.senses ? (
          <p>
            <strong>Senses:</strong> {statBlock.senses}
          </p>
        ) : null
      }
      {
        statBlock.languages ? (
          <p>
            <strong>Languages:</strong> {statBlock.languages}
          </p>
        ) : null
      }
      {
        statBlock.cr ? (
          <p>
            <strong>Challenge:</strong> {statBlock.cr}
          </p>
        ) : null
      }
      {
        statBlock?.features?.length ? statBlock?.features?.map((f, index) => {
          return (
            <div key={index}>
              <p>
                <strong>
                  {f.name}
                </strong>
              </p>
              <EntityDescription entityDescription={f.description}/>
            </div>
          )
        }) : null
      }
      {
        statBlock?.actions?.length ? (
          <>
            <h5>Actions</h5>
            {
              statBlock?.actions?.map((a, index) => {
                return (
                  <div key={index}>
                    <p>
                      <strong>
                        {a.name}
                      </strong>
                    </p>
                    <EntityDescription entityDescription={a.description}/>
                  </div>
                )
              })
            }
          </>
        ) : null
      }
    </div>
  );
}