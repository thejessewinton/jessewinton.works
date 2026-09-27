import { CopyToClipboard } from '~/components/lab/copy-to-clipboard'
import { FileUpload } from '~/components/lab/file-upload'
import { Noise } from '~/components/lab/noise'
import { QuantityStepper } from '~/components/lab/quantity-stepper'
import { Switch } from '~/components/lab/switch'

export const LabComponents = [
  {
    title: 'Quantity stepper',
    Component: QuantityStepper,
    Background: Noise,
  },
  {
    title: 'Switch',
    Component: Switch,
    Background: Noise,
  },
  {
    title: 'Copy to clipboard',
    Component: CopyToClipboard,
    Background: Noise,
  },
  {
    title: 'File upload',
    Component: FileUpload,
    Background: Noise,
  },
]
