import * as React from 'react'

type LogoColorType = 'primary' | 'white'
type LogoProps = React.SVGProps<SVGSVGElement> & { color?: LogoColorType }

function SvgLogo(props: LogoProps) {

  // Default color is dark green
  const color = props.color === 'white' ? '#ffffff' : '#025856'

  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 335.68 107.49' height='3rem' {...props}>
      <defs>
        <style>{'.logo_svg__cls-5{fill:#69d2c4}'}</style>
      </defs>
      <g id='logo_svg__Layer_1-2' data-name='Layer 1'>
        <text
          transform='translate(71.62 86.4)'
          style={{
            isolation: 'isolate',
          }}
          fill={color}
          fontSize={100}
          fontFamily='Arial Rounded MT'>
          <tspan letterSpacing='-.01em'>{'Refer'}</tspan>
          {/* <tspan x={69.43} y={0}>
            {'e'}
          </tspan>
          <tspan x={120.86} y={0} letterSpacing='-.01em'>
            {'f'}
          </tspan>
          <tspan x={160.84} y={0}>
            {'er'}
          </tspan> */}
        </text>
        <path
          d='M68.32 51.49C68.21 69.12 57 83 40.39 86A34 34 0 01.48 53.52c0-2.28-.08-4.57 0-6.85A7.93 7.93 0 018 38.83a7.84 7.84 0 018.19 6.85c.36 2.82.24 5.69.41 8.54.65 10.49 8.33 17.1 18.88 16.27C45.85 69.67 52 63 52.34 52.29c.06-2-.06-3.92.08-5.87a7.94 7.94 0 0115.87-.06c.14 1.7.03 3.42.03 5.13z'
          fill={color}
        />
        <path
          className='logo_svg__cls-5'
          d='M8.28 31.42A8.37 8.37 0 010 22.7a8.63 8.63 0 018.49-8.38A9.07 9.07 0 0117 22.83a8.56 8.56 0 01-8.72 8.59zM60.22 31.42A8.52 8.52 0 0152 22.89a8.77 8.77 0 018.59-8.58A9 9 0 0169 22.85a8.6 8.6 0 01-8.78 8.57z'
        />
      </g>
    </svg>
  )
}

export default SvgLogo
